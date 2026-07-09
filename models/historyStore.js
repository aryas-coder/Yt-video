import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const historyFile = process.env.HISTORY_FILE || path.join(__dirname, '..', 'logs', 'history.json')

const ensureHistoryFile = () => {
  if (!fs.existsSync(historyFile)) {
    fs.mkdirSync(path.dirname(historyFile), { recursive: true })
    fs.writeFileSync(historyFile, '[]')
  }
}

const readHistory = () => {
  ensureHistoryFile()
  return JSON.parse(fs.readFileSync(historyFile, 'utf8'))
}

const writeHistory = (items) => {
  ensureHistoryFile()
  fs.writeFileSync(historyFile, JSON.stringify(items, null, 2))
}

export const getHistory = () => readHistory()

export const addHistoryItem = (item) => {
  const history = readHistory()
  history.unshift(item)
  writeHistory(history)
  return history
}

export const deleteHistoryItem = (id) => {
  const history = readHistory().filter((item) => item.id !== id)
  writeHistory(history)
  return history
}

export const clearHistory = () => {
  writeHistory([])
  return []
}
