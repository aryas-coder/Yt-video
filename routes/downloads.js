import { Router } from 'express'
import { addDownload, cancelDownload, cleanupQueue, getQueueStatus, processDownload, retryDownload } from '../services/downloadService.js'
import { logger } from '../utils/logger.js'

const router = Router()

router.post('/start', async (req, res, next) => {
  try {
    const { url, format = 'MP4', quality = '1080p', audioQuality = '128kbps' } = req.body
    const record = await addDownload({ url, format, quality, audioQuality })
    const result = await processDownload(record)
    logger.info(`Download started for ${record.id}`)
    res.json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
})

router.get('/queue', (_req, res) => {
  res.json({ success: true, data: getQueueStatus() })
})

router.post('/cancel/:id', (req, res, next) => {
  try {
    const record = cancelDownload(req.params.id)
    res.json({ success: true, data: record })
  } catch (error) {
    next(error)
  }
})

router.post('/retry/:id', async (req, res, next) => {
  try {
    const result = await retryDownload(req.params.id)
    res.json({ success: true, data: result })
  } catch (error) {
    next(error)
  }
})

router.post('/cleanup', (_req, res) => {
  res.json({ success: true, data: cleanupQueue() })
})

export default router
