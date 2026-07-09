const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const routes = require('./routes')
const { errorHandler } = require('./middleware/errorHandler')
const { setupLogs } = require('./utils/logger')
const { corsOrigin, rateLimitWindow, rateLimitMax } = require('./config')

module.exports = function createApp(){
  const app = express()
  setupLogs()

  app.use(helmet())
  app.use(compression())
  app.use(express.json({ limit: '5mb' }))
  app.use(express.urlencoded({ extended: true }))

  app.use(cors({ origin: corsOrigin }))

  app.use(rateLimit({ windowMs: rateLimitWindow, max: rateLimitMax }))

  app.use(morgan('combined'))

  app.use('/api', routes)

  app.use(errorHandler)

  return app
}
