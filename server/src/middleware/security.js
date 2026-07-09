const xss = require('xss')

function sanitizeBody(req, res, next){
  if(req.body && typeof req.body === 'object'){
    for(const k of Object.keys(req.body)){
      if(typeof req.body[k] === 'string') req.body[k] = xss(req.body[k])
    }
  }
  next()
}

module.exports = { sanitizeBody }
