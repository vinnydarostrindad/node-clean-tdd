const { MongoClient } = require('mongodb')

module.exports = {
  async connect (url, dbName) {
    this.url = url
    this.dbName = dbName
    this.client = await MongoClient.connect(url)
    this.db = this.client.db(dbName)
  },
  // connect: async function (url, dbName) {
  //   client = await MongoClient.connect(url)
  //   db = client.db(dbName)
  // }

  async disconnect () {
    await this.client.close()
    this.client = null
    this.db = null
  },

  async getDb () {
    if (!this.client) {
      await this.connect(this.url, this.dbName)
    }
    return this.db
  }
}
