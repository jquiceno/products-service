'use strict'

require('dotenv').config()
const server = require('./server')
const Db = require('./lib/Db')
const controllers = require('./controllers')
const middlewares = require('./middlewares')
const { makeRoutes, errorHandler } = require('./helpers')

const { PORT = 3000, MONGO_URI } = process.env

async function main () {
  try {
    await Db.connect(MONGO_URI)
    console.log('DB Connected!')

    makeRoutes({ server, controllers, middlewares })
    console.log('Routes created')

    server.use(errorHandler)

    server.listen(PORT, () => {
      console.log(`Server start in port ${PORT}`)
    })
  } catch (error) {
    console.error(`There is an error starting app: ${error}`)
    Db.connected && await Db.close()
    process.exit(0)
  }
}

main()
