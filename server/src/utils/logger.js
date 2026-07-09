const { createLogger, transports, format } = require('winston')
const path = require('path')
const fs = require('fs-extra')

function setupLogs(){
  const logDir = path.resolve(__dirname, '../../logs')
  fs.ensureDirSync(logDir)

  const logger = createLogger({
    level: 'info',
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
      new transports.File({ filename: path.join(logDir, 'combined.log') })
    ]
  })

  if(process.env.NODE_ENV !== 'production'){
    logger.add(new transports.Console({ format: format.simple() }))
  }

  global.__logger = logger
}

module.exports = { setupLogs }
