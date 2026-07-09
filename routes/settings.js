import { Router } from 'express'
import { getSettings, saveSettings } from '../models/settingsStore.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ success: true, data: getSettings() })
})

router.put('/', (req, res) => {
  const settings = saveSettings(req.body)
  res.json({ success: true, data: settings })
})

export default router
