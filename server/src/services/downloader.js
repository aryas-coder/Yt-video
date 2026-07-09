const path = require('path')
const fs = require('fs-extra')
const { v4: uuidv4 } = require('uuid')
const ytdl = require('ytdl-core')
const ffmpegPath = require('ffmpeg-static')
const ffmpeg = require('fluent-ffmpeg')
ffmpeg.setFfmpegPath(ffmpegPath)
const { tempDir } = require('../config')
const { isValidYoutubeUrl, extractVideoId } = require('../utils/youtube')
const historyModel = require('../models/historyModel')

class Downloader{
  constructor(){
    this.jobs = new Map()
    fs.ensureDirSync(tempDir)
    this.processing = false
  }

  static getInstance(){
    if(!global.__downloader) global.__downloader = new Downloader()
    return global.__downloader
  }

  async enqueue({ url, format='mp4', quality='best', type='video' }){
    if(!isValidYoutubeUrl(url)) throw new Error('Invalid URL')
    const id = uuidv4()
    const vid = extractVideoId(url)
    let info = null
    try{ info = await ytdl.getInfo(vid) }catch(e){/*continue*/}
    const title = info && info.videoDetails && info.videoDetails.title ? info.videoDetails.title : 'video'
    const filename = this._sanitizeFilename(`${title}-${id}.${format}`)
    const filepath = path.join(tempDir, filename)

    const job = { id, url, vid, meta: { title }, filename, filepath, format, quality, type, status: 'queued', progress:0, createdAt: new Date().toISOString() }
    this.jobs.set(id, job)

    // persist history row
    await historyModel.create({ id, url, title: job.meta.title, filename: job.filename, format, quality, status: job.status })

    setImmediate(()=>this._process())
    return job
  }

  getJob(id){
    return this.jobs.get(id) || null
  }

  async cancel(id){
    const job = this.jobs.get(id)
    if(!job) return false
    job.cancelRequested = true
    if(job.ffproc){
      try{ job.ffproc.kill('SIGKILL') }catch(e){}
    }
    if(job.stream){
      try{ job.stream.destroy() }catch(e){}
    }
    job.status = 'cancelled'
    await historyModel.updateStatus(id, 'cancelled')
    return true
  }

  async retry(id){
    const old = this.jobs.get(id)
    if(!old) return null
    const job = await this.enqueue({ url: old.url, format: old.format, quality: old.quality, type: old.type })
    return job
  }

  async _process(){
    if(this.processing) return
    this.processing = true
    for(const [id, job] of this.jobs){
      if(job.status === 'queued'){
        try{
          job.status = 'processing'
          await historyModel.updateStatus(id, 'processing')
          await this._runJob(job)
        }catch(err){
          job.status = 'failed'
          job.error = err.message
          await historyModel.updateStatus(id, 'failed', job.error)
        }
      }
    }
    this.processing = false
  }

  _sanitizeFilename(name){
    return name.replace(/[\\/:*?"<>|]/g, '').replace(/\s+/g, '-').slice(0,200)
  }

  async _runJob(job){
    const { id, url, filepath, format, type } = job
    return new Promise((resolve, reject)=>{
      const vid = job.vid
      const ytdlOptions = { quality: job.quality === 'best' ? 'highest' : job.quality }

      let totalBytes = 0
      let downloaded = 0

      const stream = ytdl(vid, ytdlOptions)
      job.stream = stream

      stream.on('info', (info, formatInfo)=>{
        if(formatInfo && formatInfo.contentLength) totalBytes = Number(formatInfo.contentLength)
      })

      stream.on('progress', (chunkLength, downloadedBytes, total)=>{
        downloaded = downloadedBytes
        if(total) totalBytes = total
        job.progress = totalBytes ? Math.round((downloaded/totalBytes)*100) : 0
      })

      stream.on('error', async (err)=>{
        job.status = 'failed'
        job.error = err.message
        await historyModel.updateStatus(id, 'failed', err.message)
        reject(err)
      })

      // If audio (mp3) conversion required
      if(format === 'mp3' || type === 'audio' || filepath.endsWith('.mp3')){
        const tempOut = filepath
        const proc = ffmpeg(stream).audioBitrate(128).format('mp3').on('error', async (err)=>{
          job.status = 'failed'
          job.error = err.message
          await historyModel.updateStatus(id, 'failed', err.message)
          reject(err)
        }).on('progress', async (progress)=>{
          // progress.percent may be undefined; fallback to job.progress
          if(progress.percent) job.progress = Math.round(progress.percent)
        }).on('end', async ()=>{
          job.status = 'completed'
          job.progress = 100
          job.filepath = tempOut
          job.completedAt = new Date().toISOString()
          job.contentType = 'audio/mpeg'
          await historyModel.updateStatus(id, 'completed', null, job.filepath)
          resolve(job)
        }).save(tempOut)
        job.ffproc = proc
      }else{
        // save raw video to file
        const out = fs.createWriteStream(filepath)
        stream.pipe(out)
        out.on('close', async ()=>{
          job.status = 'completed'
          job.progress = 100
          job.completedAt = new Date().toISOString()
          job.contentType = 'video/mp4'
          await historyModel.updateStatus(id, 'completed', null, job.filepath)
          resolve(job)
        })
        out.on('error', async (err)=>{
          job.status = 'failed'
          job.error = err.message
          await historyModel.updateStatus(id, 'failed', err.message)
          reject(err)
        })
      }

    })
  }
}

module.exports = Downloader
