const MongoHelper = require('./helpers/mongo-helper.js')
let db

class UpdateAcessTokenRepository {
  constructor (userModel) {
    this.userModel = userModel
  }

  async update (userId, acessToken) {
    await this.userModel.updateOne({ _id: userId }, { $set: { acessToken } })
  }
}

describe('UpdateAcessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    db = await MongoHelper.getDb()
  })

  beforeEach(async () => {
    await db.collection('users').deleteMany
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Shpuld update the user with the given acessToken', async () => {
    const userModel = db.collection('users')
    const sut = new UpdateAcessTokenRepository(userModel)
    const insertedResult = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const fakeUser = await userModel.findOne({ _id: insertedResult.insertedId })
    await sut.update(fakeUser._id, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUser._id })
    expect(updatedFakeUser.acessToken).toBe('valid_token')
  })

  test('Should throw if no userModel is provided', async () => {
    const sut = new UpdateAcessTokenRepository()
    const userModel = db.collection('users')
    const insertedResult = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const fakeUser = await userModel.findOne({ _id: insertedResult.insertedId })
    const promise = sut.update(fakeUser._id, 'valid_token')
    expect(promise).rejects.toThrow()
  })
})
