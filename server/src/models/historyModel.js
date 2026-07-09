const db = require('./db')

const create = (data)=>{
  const stmt = db.prepare('INSERT INTO history (id,url,title,filename,format,quality,status,created_at) VALUES (@id,@url,@title,@filename,@format,@quality,@status,@created_at)')
  return stmt.run({ ...data, created_at: new Date().toISOString() })
}

const list = ()=>{
  const stmt = db.prepare('SELECT * FROM history ORDER BY created_at DESC')
  return stmt.all()
}

const remove = (id)=>{
  const stmt = db.prepare('DELETE FROM history WHERE id = ?')
  return stmt.run(id)
}

const clear = ()=>{
  const stmt = db.prepare('DELETE FROM history')
  return stmt.run()
}

const updateStatus = (id, status, error=null, filepath=null)=>{
  const stmt = db.prepare('UPDATE history SET status=@status, error=@error, filepath=@filepath, completed_at=@completed_at WHERE id=@id')
  return stmt.run({ id, status, error, filepath, completed_at: status==='completed' ? new Date().toISOString() : null })
}

module.exports = { create, list, remove, clear, updateStatus }
