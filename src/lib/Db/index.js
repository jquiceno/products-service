const mongoose = require('mongoose')

class Db {
  constructor () {
    this.connected = false
  }

  async connect (uri) {
    const connection = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true
    })

    this.connected = true

    return connection
  }

  async close () {
    await mongoose.connection.close()
    this.connected = false
  }
}

module.exports = new Db()
