const db = require('./db')

const getAll = ()=>{
  const stmt = db.prepare('SELECT key, value FROM settings')
  const rows = stmt.all()
  const out = {}
  rows.forEach(r=>{ try{ out[r.key] = JSON.parse(r.value) }catch(e){ out[r.key] = r.value } })
  return out
}

const update = (kv)=>{
  const insert = db.prepare('INSERT OR REPLACE INTO settings (key,value) VALUES (@key,@value)')
  const keys = Object.keys(kv)
  const tx = db.transaction((entries)=>{
    for(const k of entries){ insert.run({ key:k, value: JSON.stringify(kv[k]) }) }
  })
  tx(keys)
  return getAll()
}

module.exports = { getAll, update }
