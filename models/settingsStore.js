import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const settingsFile = process.env.SETTINGS_FILE || path.join(__dirname, '..', 'logs', 'settings.json')

const ensureSettingsFile = () => {
  if (!fs.existsSync(settingsFile)) {
    fs.mkdirSync(path.dirname(settingsFile), { recursive: true })
    fs.writeFileSync(settingsFile, JSON.stringify({
      defaultQuality: '1080p',
      defaultFormat: 'MP4',
      themePreference: 'dark',
      languagePreference: 'English',
    }, null, 2))
  }
}

const readSettings = () => {
  ensureSettingsFile()
  return JSON.parse(fs.readFileSync(settingsFile, 'utf8'))
}

const writeSettings = (settings) => {
  ensureSettingsFile()
  fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2))
}

export const getSettings = () => readSettings()

export const saveSettings = (settings) => {
  const current = readSettings()
  const next = { ...current, ...settings }
  writeSettings(next)
  return next
}
