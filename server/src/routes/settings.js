const express = require('express')
const { body } = require('express-validator')
const { getSettings, updateSettings } = require('../controllers/settingsController')
const { validate } = require('../middleware/validate')

const router = express.Router()

router.get('/', getSettings)
router.put('/', [
  body('defaultQuality').optional().isString(),
  body('defaultFormat').optional().isString(),
  body('theme').optional().isString(),
  body('language').optional().isString()
], validate, updateSettings)

module.exports = router
