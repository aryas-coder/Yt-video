import { URL } from 'url'
import { logger } from '../utils/logger.js'

const YOUTUBE_HOSTS = ['www.youtube.com', 'm.youtube.com', 'youtube.com', 'youtu.be']

const normalizeUrl = (value) => {
  try {
    const parsed = new URL(value)
    return parsed.toString()
  } catch {
    throw new Error('Invalid URL format')
  }
}

export const parseYouTubeUrl = (value) => {
  const normalized = normalizeUrl(value)
  const parsed = new URL(normalized)
  const isYouTube = YOUTUBE_HOSTS.includes(parsed.hostname) || parsed.hostname.endsWith('youtube.com')
  if (!isYouTube) {
    throw new Error('Unsupported URL: only YouTube URLs are supported')
  }
  if (parsed.hostname === 'youtu.be') {
    return { videoId: parsed.pathname.slice(1), service: 'youtube' }
  }
  const videoId = parsed.searchParams.get('v')
  if (!videoId) {
    throw new Error('Video ID not found in URL')
  }
  return { videoId, service: 'youtube' }
}

export const getVideoMetadata = async (url) => {
  const parsed = parseYouTubeUrl(url)
  logger.info(`Metadata request for ${parsed.videoId}`)

  return {
    success: true,
    data: {
      title: 'Sample YouTube Video',
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80',
      channelName: 'FluxTube Studio',
      duration: '07:42',
      qualities: ['1080p', '720p', '480p'],
      formats: ['MP4', 'MP3'],
      estimatedSize: '134.6 MB',
      url,
      videoId: parsed.videoId,
    },
  }
}
