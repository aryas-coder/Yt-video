import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const logDir = process.env.LOG_DIR || path.join(__dirname, '..', 'logs')

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true })
}

const logFile = path.join(logDir, 'app.log')

const write = (level, message) => {
  const entry = `${new Date().toISOString()} [${level}] ${message}\n`
  fs.appendFileSync(logFile, entry)
  if (process.env.NODE_ENV !== 'test') {
    console.log(entry.trim())
  }
}

export const logger = {
  info: (message) => write('INFO', message),
  warn: (message) => write('WARN', message),
  error: (message) => write('ERROR', message),
}
