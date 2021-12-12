'use strict'

require('dotenv').config()
const jwt = require('jsonwebtoken')

const { AUTH_JWT_SECRET, AUTH_JWT_EXPIRESIN } = process.env

class Jwt {
  sign (payload, { expiresIn = AUTH_JWT_EXPIRESIN } = {}) {
    const options = {}

    if (expiresIn) {
      options.expiresIn = expiresIn
    }

    const token = jwt.sign(payload, AUTH_JWT_SECRET, options)

    return token
  }

  verify (token) {
    try {
      const decoded = jwt.verify(token, AUTH_JWT_SECRET)
      decoded.isValid = true

      return decoded
    } catch (error) {
      return this.error(error)
    }
  }

  error (e) {
    e.isValid = false
    return e
  }
}

module.exports.jwt = new Jwt()
