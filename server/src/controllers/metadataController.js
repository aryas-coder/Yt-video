const ytdl = require('ytdl-core')
const { validationResult } = require('express-validator')
const { isValidYoutubeUrl, extractVideoId } = require('../utils/youtube')

async function getMetadata(req, res, next){
  try{
    const url = req.query.url
    if(!isValidYoutubeUrl(url)) return res.status(400).json({error:'Invalid YouTube URL'})

    const id = extractVideoId(url)
    const info = await ytdl.getInfo(id)

    const videoDetails = info.videoDetails
    const formats = info.formats

    const availableFormats = formats
      .filter(f=>f.container)
      .map(f=>({ itag: f.itag, container: f.container, qualityLabel: f.qualityLabel||null, audioBitrate: f.audioBitrate||null, approxFileSize: f.contentLength ? Number(f.contentLength) : null }))

    // Derive available unique qualities/formats
    const qualities = Array.from(new Set(availableFormats.map(f=>f.qualityLabel).filter(Boolean)))
    const containers = Array.from(new Set(availableFormats.map(f=>f.container)))

    const result = {
      id: videoDetails.videoId,
      title: videoDetails.title,
      description: videoDetails.description,
      thumbnail: videoDetails.thumbnails && videoDetails.thumbnails.length ? videoDetails.thumbnails[videoDetails.thumbnails.length-1].url : null,
      channel: videoDetails.author && videoDetails.author.name,
      duration: Number(videoDetails.lengthSeconds) || null,
      viewCount: Number(videoDetails.viewCount) || null,
      publishDate: videoDetails.publishDate || null,
      qualities,
      formats: containers,
      rawFormats: availableFormats
    }

    return res.json(result)
  }catch(err){
    if(err && err.message && /Video not available/.test(err.message)){
      return res.status(404).json({error:'Video unavailable or removed'})
    }
    next(err)
  }
}

module.exports = { getMetadata }
