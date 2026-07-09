export const apiDocs = {
  metadata: {
    method: 'POST',
    route: '/api/metadata',
    requestBody: {
      url: 'https://www.youtube.com/watch?v=example'
    },
    responseExample: {
      success: true,
      data: {
        title: 'Sample YouTube Video',
        thumbnail: 'https://example.com/thumbnail.jpg',
        channelName: 'FluxTube Studio',
        duration: '07:42',
        qualities: ['1080p', '720p', '480p'],
        formats: ['MP4', 'MP3'],
        estimatedSize: '134.6 MB'
      }
    },
    errorResponses: {
      invalidUrl: { success: false, error: 'A valid URL is required' },
      unsupportedUrl: { success: false, error: 'Unsupported URL: only YouTube URLs are supported' }
    }
  },
  downloads: {
    start: {
      method: 'POST',
      route: '/api/downloads/start',
      requestBody: {
        url: 'https://www.youtube.com/watch?v=example',
        format: 'MP4',
        quality: '1080p',
        audioQuality: '128kbps'
      },
      responseExample: {
        success: true,
        data: {
          id: 'uuid',
          status: 'completed',
          progress: 100,
          fileName: 'uuid.mp4'
        }
      }
    }
  }
}
