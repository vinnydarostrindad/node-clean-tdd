const MongoHelper = require('../helpers/mongo-helper.js')
const { MissingParamError } = require('../../utils/errors')
const UpdateAcessTokenRepository = require('./update-acess-token-repository.js')
let userModel, fakeUserId

const makeSut = () => {
  return new UpdateAcessTokenRepository()
}

describe('UpdateAcessToken Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    userModel = await MongoHelper.getCollection('users')
  })

  beforeEach(async () => {
    await userModel.deleteMany()
    const insertedResult = await userModel.insertOne({
      email: 'valid_email@mail.com',
      name: 'any_name',
      age: 50,
      state: 'any_state',
      password: 'hashed_password'
    })
    const fakeUser = await userModel.findOne({ _id: insertedResult.insertedId })
    fakeUserId = fakeUser._id
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Shpuld update the user with the given acessToken', async () => {
    const sut = makeSut()
    await sut.update(fakeUserId, 'valid_token')
    const updatedFakeUser = await userModel.findOne({ _id: fakeUserId })
    expect(updatedFakeUser.acessToken).toBe('valid_token')
  })

  test('Should throw if no params are provided', async () => {
    const sut = makeSut()
    expect(sut.update()).rejects.toThrow(new MissingParamError('userId'))
    expect(sut.update(fakeUserId)).rejects.toThrow(new MissingParamError('acessToken'))
  })
})
