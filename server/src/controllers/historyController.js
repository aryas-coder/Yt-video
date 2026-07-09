const historyModel = require('../models/historyModel')

async function listHistory(req, res, next){
  try{
    const items = await historyModel.list()
    res.json(items)
  }catch(err){next(err)}
}

async function deleteEntry(req, res, next){
  try{
    const id = req.params.id
    await historyModel.remove(id)
    res.json({ id })
  }catch(err){next(err)}
}

async function clearHistory(req, res, next){
  try{
    await historyModel.clear()
    res.json({ cleared:true })
  }catch(err){next(err)}
}

module.exports = { listHistory, deleteEntry, clearHistory }
