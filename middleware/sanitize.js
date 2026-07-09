import { body, validationResult } from 'express-validator'

export const sanitizeRequest = (req, _res, next) => {
  for (const key of Object.keys(req.body || {})) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key].trim()
    }
  }
  next()
}

export const validateUrl = [
  body('url').isString().isURL({ protocols: ['http', 'https'] }).withMessage('A valid URL is required'),
]

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() })
  }
  next()
}
