import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { logger } from '../utils/logger.js'
import { ensureDirectories, removeFile } from '../utils/fs.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const downloadDir = process.env.DOWNLOAD_DIR || path.join(__dirname, '..', 'downloads')
const tempDir = process.env.TEMP_DIR || path.join(__dirname, '..', 'temp')

ensureDirectories()

const queue = []

const createDownloadRecord = ({ url, format, quality, audioQuality }) => ({
  id: uuidv4(),
  url,
  format,
  quality,
  audioQuality,
  status: 'queued',
  progress: 0,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
})

export const addDownload = async ({ url, format, quality, audioQuality }) => {
  const record = createDownloadRecord({ url, format, quality, audioQuality })
  queue.push(record)
  logger.info(`Queued download ${record.id}`)
  return record
}

export const processDownload = async (record) => {
  const fileName = `${record.id}.${record.format.toLowerCase()}`
  const outputPath = path.join(downloadDir, fileName)
  const tempPath = path.join(tempDir, fileName)

  try {
    record.status = 'downloading'
    record.progress = 20
    record.updatedAt = new Date().toISOString()

    await new Promise((resolve) => setTimeout(resolve, 700))

    fs.writeFileSync(tempPath, 'sample-download-buffer')

    record.progress = 90
    record.updatedAt = new Date().toISOString()
    await new Promise((resolve) => setTimeout(resolve, 700))

    fs.renameSync(tempPath, outputPath)
    record.status = 'completed'
    record.progress = 100
    record.filePath = outputPath
    record.fileName = fileName
    record.updatedAt = new Date().toISOString()
    logger.info(`Completed download ${record.id}`)
    return record
  } catch (error) {
    record.status = 'failed'
    record.error = error.message
    record.updatedAt = new Date().toISOString()
    removeFile(tempPath)
    logger.error(`Download failed ${record.id}: ${error.message}`)
    return record
  }
}

export const getQueueStatus = () => queue

export const cancelDownload = (id) => {
  const record = queue.find((item) => item.id === id)
  if (!record) {
    throw new Error('Download not found')
  }
  record.status = 'canceled'
  record.updatedAt = new Date().toISOString()
  return record
}

export const retryDownload = async (id) => {
  const record = queue.find((item) => item.id === id)
  if (!record) {
    throw new Error('Download not found')
  }
  record.status = 'queued'
  record.progress = 0
  record.updatedAt = new Date().toISOString()
  return processDownload(record)
}

export const cleanupQueue = () => {
  const completedOrFailed = queue.filter((item) => ['completed', 'failed', 'canceled'].includes(item.status))
  completedOrFailed.forEach((item) => {
    const index = queue.indexOf(item)
    if (index >= 0) queue.splice(index, 1)
  })
  return queue
}
