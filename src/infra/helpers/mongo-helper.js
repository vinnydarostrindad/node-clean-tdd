const { MongoClient } = require('mongodb')

module.exports = {
  async connect (url) {
    this.url = url
    this.client = await MongoClient.connect(url)
    this.db = this.client.db()
  },
  // connect: async function (url) {
  //   client = await MongoClient.connect(url)
  //   db = client.db()
  // }

  async disconnect () {
    await this.client.close()
    this.client = null
    this.db = null
  },

  async getCollection (name) {
    if (!this.client) {
      await this.connect(this.url)
    }
    return this.db.collection(name)
  }
}
