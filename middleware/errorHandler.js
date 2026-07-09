import { logger } from '../utils/logger.js'

export const notFoundHandler = (req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' })
}

export const errorHandler = (err, _req, res, _next) => {
  logger.error(err.message)

  if (err.statusCode) {
    return res.status(err.statusCode).json({ success: false, error: err.message })
  }

  return res.status(500).json({ success: false, error: 'Internal server error' })
}
