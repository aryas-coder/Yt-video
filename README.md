# FluxTube Backend

## Overview
This project now includes a production-ready Node.js + Express backend that preserves the existing frontend UI while adding secure API endpoints for metadata lookup, downloads, history, and settings.

## Scripts
- `npm run dev` — start the Vite frontend
- `npm run dev:server` — start the backend server
- `npm run build` — build the frontend for production
- `npm run start` — start the backend in production mode

## Environment
Copy `.env.example` to `.env` and adjust values as needed.

## API Endpoints
### Metadata
- `POST /api/metadata`
  - Body: `{ "url": "https://www.youtube.com/watch?v=..." }`
  - Response: metadata including title, thumbnail, channel, duration, qualities, formats, and estimated size.

### Downloads
- `POST /api/downloads/start`
  - Body: `{ "url": "https://www.youtube.com/watch?v=...", "format": "MP4", "quality": "1080p", "audioQuality": "128kbps" }`
- `GET /api/downloads/queue`
- `POST /api/downloads/cancel/:id`
- `POST /api/downloads/retry/:id`
- `POST /api/downloads/cleanup`

### History
- `GET /api/history`
- `POST /api/history`
- `DELETE /api/history/:id`
- `DELETE /api/history/clear/all`

### Settings
- `GET /api/settings`
- `PUT /api/settings`

### Health
- `GET /health`

## Production Notes
- CORS, Helmet, compression, rate limiting, and request sanitization are enabled.
- Logs are written to the `logs` directory.
- Downloads and temporary files are stored under the `downloads` and `temp` folders.
