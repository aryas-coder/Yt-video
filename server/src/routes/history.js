const express = require('express')
const { param } = require('express-validator')
const { listHistory, deleteEntry, clearHistory } = require('../controllers/historyController')
const { validate } = require('../middleware/validate')

const router = express.Router()

router.get('/', listHistory)
router.delete('/:id', [param('id').isUUID()], validate, deleteEntry)
router.delete('/', clearHistory)

module.exports = router
