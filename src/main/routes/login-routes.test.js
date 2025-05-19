const request = require('supertest')
const app = require('../config/app.js')
const bcrypt = require('bcrypt')
const MongoHelper = require('../../infra/helpers/mongo-helper.js')
let userModel

describe('Login', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 when valid credential are provided', async () => {
    const insertedResult = await userModel.insertOne({
      email: 'valid_email@mail.com',
      password: bcrypt.hashSync('hashed_password', 10)
    })
    await userModel.findOne({ _id: insertedResult.insertedId })
    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      })
      .expect(200)
  })

  test('Should return 401 when valid credential are provided', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: 'valid_email@mail.com',
        password: 'hashed_password'
      })
      .expect(401)
  })
})
