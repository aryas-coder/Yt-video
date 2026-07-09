import { Router } from 'express'
import { clearHistory, deleteHistoryItem, getHistory, addHistoryItem } from '../models/historyStore.js'

const router = Router()

router.get('/', (_req, res) => {
  res.json({ success: true, data: getHistory() })
})

router.post('/', (req, res) => {
  const item = {
    id: `${Date.now()}`,
    title: req.body.title || 'Downloaded media',
    format: req.body.format || 'MP4',
    quality: req.body.quality || '1080p',
    status: req.body.status || 'completed',
    downloadDate: new Date().toISOString(),
  }
  res.json({ success: true, data: addHistoryItem(item) })
})

router.delete('/:id', (req, res) => {
  res.json({ success: true, data: deleteHistoryItem(req.params.id) })
})

router.delete('/clear/all', (_req, res) => {
  res.json({ success: true, data: clearHistory() })
})

export default router
