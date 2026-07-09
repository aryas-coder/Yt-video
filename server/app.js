import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { sanitizeRequest } from '../middleware/sanitize.js'
import { errorHandler, notFoundHandler } from '../middleware/errorHandler.js'
import metadataRoutes from '../routes/metadata.js'
import downloadRoutes from '../routes/downloads.js'
import historyRoutes from '../routes/history.js'
import settingsRoutes from '../routes/settings.js'
import { ensureDirectories } from '../utils/fs.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.set('trust proxy', 1)

app.use(helmet())
app.use(compression())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  }),
)
app.use(
  rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 900000),
    max: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
    standardHeaders: true,
    legacyHeaders: false,
  }),
)
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(sanitizeRequest)

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'flux-tube-api' })
})

app.use('/api/metadata', metadataRoutes)
app.use('/api/downloads', downloadRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/settings', settingsRoutes)

app.use(express.static(path.join(__dirname, '..', 'dist')))
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

app.use(notFoundHandler)
app.use(errorHandler)

ensureDirectories()

export default app
