const { v4: uuidv4 } = require('uuid')
const Downloader = require('../services/downloader')
const historyModel = require('../models/historyModel')

const downloader = Downloader.getInstance()

async function createDownload(req, res, next){
  try{
    const { url, format, quality, type } = req.body
    const job = await downloader.enqueue({ url, format, quality, type })

    // persist initial history record
    await historyModel.create({ id: job.id, url, title: job.meta.title || null, filename: job.filename, format, quality, status: job.status })

    return res.status(201).json({ jobId: job.id })
  }catch(err){
    next(err)
  }
}

async function getDownloadStatus(req, res, next){
  try{
    const id = req.params.id
    const job = downloader.getJob(id)
    if(!job) return res.status(404).json({error:'Job not found'})
    return res.json({ id: job.id, status: job.status, progress: job.progress, filename: job.filename, error: job.error || null })
  }catch(err){next(err)}
}

async function cancelDownload(req, res, next){
  try{
    const id = req.params.id
    const ok = await downloader.cancel(id)
    if(!ok) return res.status(404).json({error:'Job not found or cannot be cancelled'})
    await historyModel.updateStatus(id, 'cancelled')
    return res.json({ id, cancelled: true })
  }catch(err){next(err)}
}

async function retryDownload(req, res, next){
  try{
    const id = req.params.id
    const job = await downloader.retry(id)
    if(!job) return res.status(404).json({error:'Job not found or cannot be retried'})
    await historyModel.updateStatus(job.id, job.status)
    return res.json({ id: job.id })
  }catch(err){next(err)}
}

async function streamFile(req, res, next){
  try{
    const id = req.params.id
    const job = downloader.getJob(id)
    if(!job) return res.status(404).json({error:'Job not found'})
    if(job.status !== 'completed') return res.status(400).json({error:'File not ready'})

    const filePath = job.filepath
    res.setHeader('Content-Disposition', `attachment; filename="${job.filename}"`)
    res.setHeader('Content-Type', job.contentType || 'application/octet-stream')
    const fs = require('fs')
    const stream = fs.createReadStream(filePath)
    stream.pipe(res)
    stream.on('error', (err)=>next(err))
  }catch(err){next(err)}
}

module.exports = { createDownload, getDownloadStatus, cancelDownload, retryDownload, streamFile }
