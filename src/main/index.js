const MongoHelper = require('../infra/helpers/mongo-helper.js')
const env = require('./config/env.js')

MongoHelper.connect(env.mongoUrl)
  .then(() => {
    const app = require('./config/app.js')
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch(console.error)
