'use strict'

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

class Db {
  constructor () {
    this.mongod = null
    this.connected = false
  }

  async connect (uri) {
    if (!uri) {
      this.mongod = await MongoMemoryServer.create()
      uri = this.mongod.getUri()
      console.warn('WARNING: Database is starting in a memory instance, all data could be lost')
    }

    this.connected = true

    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  }

  async close () {
    await mongoose.connection.close()
    if (this.mongod) {
      await this.mongod.stop()
    }
  }
}

module.exports = new Db()
