'use strict'

require('dotenv').config()
const server = require('./server')
const Db = require('./lib/Db')
const controllers = require('./controllers')
const { makeRoutes, errorHandler } = require('./helpers')

const { PORT = 3000 } = process.env

async function main () {
  try {
    await Db.connect()
    console.log('DB Connected!')

    makeRoutes(server, controllers)
    console.log('Routes created')

    server.use(errorHandler)

    server.listen(PORT, () => {
      console.log(`Server start in port ${PORT}`)
    })
  } catch (error) {
    console.error(`There is an error starting app: ${error}`)
    process.exit(0)
  }
}

main()
