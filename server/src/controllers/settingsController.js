const settingsModel = require('../models/settingsModel')

async function getSettings(req, res, next){
  try{
    const s = await settingsModel.getAll()
    res.json(s)
  }catch(err){next(err)}
}

async function updateSettings(req, res, next){
  try{
    const payload = req.body
    const updated = await settingsModel.update(payload)
    res.json(updated)
  }catch(err){next(err)}
}

module.exports = { getSettings, updateSettings }
