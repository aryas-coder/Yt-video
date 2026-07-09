const ytdl = require('ytdl-core')
const { isValidYoutubeUrl, extractVideoId } = require('../utils/youtube')

async function fetchInfo(url){
  if(!isValidYoutubeUrl(url)) throw new Error('Invalid YouTube URL')
  const id = extractVideoId(url)
  const info = await ytdl.getInfo(id)
  return info
}

module.exports = { fetchInfo }
