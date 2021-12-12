'use strict'

const mongoose = require('mongoose')

async function connect () {
  await mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
}

module.exports = {
  connect
}
