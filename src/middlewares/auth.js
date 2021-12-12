'use strict'

const { unauthorized } = require('@hapi/boom')
const { jwt } = require('../lib/Auth')

function authorization ({ headers }, res, next) {
  const auth = headers.authorization

  if (!auth || !auth.startsWith('Bearer')) throw unauthorized('Access Token is required')

  const token = auth.split(' ')[1]

  jwt.verify(token)

  const tokenData = jwt.verify(token)
  // await this.broker.call('auth.getTokenData', { token })

  if (!tokenData.isValid) throw unauthorized('Invalid Access token')

  return next()
}

module.exports = { authorization }
