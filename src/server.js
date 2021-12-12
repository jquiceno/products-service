'use strict'

const express = require('express')
const cors = require('cors')
const { boomify } = require('@hapi/boom')
const morgan = require('morgan')
const pk = require(`${process.cwd()}/package.json`)

const { ENV = 'dev' } = process.env

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.get('/', (req, res) => res.json({
  service: 'Products service',
  status: 'ok',
  version: pk.version
}))

app.use((error, req, res, next) => {
  if (!error) return next()

  ENV !== 'test' && console.error(error, `Error in : ${req.method}:${req.url}`)

  const { output } = boomify(error)
  return res.status(output.statusCode).json(output.payload)
})

module.exports = app
