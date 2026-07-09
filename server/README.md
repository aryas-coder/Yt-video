# Yt-video Backend

This folder contains a production-oriented backend for the Yt-video frontend.

Important requirements:
- Node.js + Express
- Uses ytdl-core + ffmpeg for metadata and streaming
- SQLite (better-sqlite3) for lightweight persistent storage
- Rate limiting, Helmet, CORS, compression, request validation
- In-memory queue with persistent job state and progress polling

Requirements for running:
- Node 18+
- ffmpeg installed on the host (ffmpeg-static is used to help locate binary)

Quick start:

1. cd server
2. npm install
3. cp .env.example .env (edit if necessary)
4. npm run dev

Production:
- Ensure environment variables set, and run `npm start`.
- Use a process manager (pm2, systemd) and place server behind a reverse proxy (nginx).

Notes:
- This backend performs downloads and conversions. Respect platform TOS and local laws when using it.
