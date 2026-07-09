const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')

const envPath = path.resolve(__dirname, '../.env')
if (fs.existsSync(envPath)) dotenv.config({ path: envPath })

module.exports = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  rateLimitWindow: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
  rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 60,
  dbPath: process.env.DB_PATH || path.resolve(__dirname, '../data/db.sqlite'),
  tempDir: process.env.TEMP_DIR || path.resolve(__dirname, '../temp')
}
