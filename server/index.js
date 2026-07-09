import http from 'http'
import dotenv from 'dotenv'
import app from './app.js'
import { logger } from '../utils/logger.js'

dotenv.config()

const server = http.createServer(app)
const port = Number(process.env.PORT || 5000)

server.listen(port, () => {
  logger.info(`API server listening on port ${port}`)
})

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  server.close(() => process.exit(0))
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  server.close(() => process.exit(0))
})
