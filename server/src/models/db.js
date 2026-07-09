const Database = require('better-sqlite3')
const { dbPath } = require('../config')
const fs = require('fs-extra')
fs.ensureDirSync(require('path').dirname(dbPath))

const db = new Database(dbPath)

// Initialize tables
db.prepare(`CREATE TABLE IF NOT EXISTS history (
  id TEXT PRIMARY KEY,
  url TEXT,
  title TEXT,
  filename TEXT,
  format TEXT,
  quality TEXT,
  status TEXT,
  error TEXT,
  filepath TEXT,
  created_at TEXT,
  completed_at TEXT
)`).run()

db.prepare(`CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
)`).run()

module.exports = db
