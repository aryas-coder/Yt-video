import { Router } from 'express'
import { getVideoMetadata } from '../services/videoService.js'
import { validateUrl, handleValidation } from '../middleware/sanitize.js'
import { logger } from '../utils/logger.js'

const router = Router()

router.post('/', validateUrl, handleValidation, async (req, res, next) => {
  try {
    const { url } = req.body
    logger.info(`Metadata request received for ${url}`)
    const result = await getVideoMetadata(url)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router
