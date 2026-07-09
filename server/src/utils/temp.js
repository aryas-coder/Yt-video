const path = require('path')
const fs = require('fs-extra')
const config = require('../config')

function cleanupTemp(){
  try{
    fs.emptyDirSync(config.tempDir)
  }catch(e){console.warn('Cleanup failed', e)}
}

module.exports = { cleanupTemp }
