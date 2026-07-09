const express = require('express')
const { query } = require('express-validator')
const { getMetadata } = require('../controllers/metadataController')
const { validate } = require('../middleware/validate')

const router = express.Router()

router.get('/', [
  query('url').exists().isString().trim().notEmpty().withMessage('url is required')
], validate, getMetadata)

module.exports = router
