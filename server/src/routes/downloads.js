const express = require('express')
const { body, param } = require('express-validator')
const {
  createDownload,
  getDownloadStatus,
  cancelDownload,
  retryDownload,
  streamFile
} = require('../controllers/downloadController')
const { validate } = require('../middleware/validate')

const router = express.Router()

router.post('/', [
  body('url').isString().trim().notEmpty(),
  body('format').isString().trim().notEmpty(),
  body('quality').optional().isString().trim(),
  body('type').optional().isString().trim()
], validate, createDownload)

router.get('/:id/status', [param('id').isUUID()], validate, getDownloadStatus)
router.post('/:id/cancel', [param('id').isUUID()], validate, cancelDownload)
router.post('/:id/retry', [param('id').isUUID()], validate, retryDownload)
router.get('/:id/file', [param('id').isUUID()], validate, streamFile)

module.exports = router
