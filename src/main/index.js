const MongoHelper = require('../infra/helpers/mongo-helper.js')
const env = require('./config/env.js')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app.js')
    app.listen(5858, () => console.log('Server Running!'))
  })
  .catch(console.error)
