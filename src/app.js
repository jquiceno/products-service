'use strict'

require('dotenv').config()
const server = require('./server')

const { PORT = 3000 } = process.env

async function main () {
  try {
    server.listen(PORT, () => {
      console.log(`Server start in port ${PORT}`)
    })
  } catch (error) {
    console.error(`There is an error starting app: ${error}`)
    process.exit(0)
  }
}

main()
