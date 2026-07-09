const express = require('express')
const metadataRoutes = require('./routes/metadata')
const downloadRoutes = require('./routes/downloads')
const historyRoutes = require('./routes/history')
const settingsRoutes = require('./routes/settings')

const router = express.Router()

router.use('/metadata', metadataRoutes)
router.use('/download', downloadRoutes)
router.use('/history', historyRoutes)
router.use('/settings', settingsRoutes)

module.exports = router
