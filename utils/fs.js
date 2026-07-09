import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const ensureDirectories = () => {
  const directories = [
    process.env.DOWNLOAD_DIR || path.join(__dirname, '..', 'downloads'),
    process.env.TEMP_DIR || path.join(__dirname, '..', 'temp'),
    process.env.LOG_DIR || path.join(__dirname, '..', 'logs'),
  ]

  directories.forEach((directory) => {
    fs.mkdirSync(directory, { recursive: true })
  })
}

export const removeFile = (filePath) => {
  if (!filePath) return
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}
