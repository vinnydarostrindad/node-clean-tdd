const LoginRouter = require('../../presentation/routers/login-router.js')
const AuthUseCase = require('../../domain/usecases/auth-usecase.js')
const EmailValidator = require('../../utils/helpers/email-validator.js')
const LoadUserByEmailRepository = require('../../infra/repositories/load-user-by-email-repository.js')
const UpdateAccessTokenRepository = require('../../infra/repositories/update-acess-token-repository.js')
const Encrypter = require('../../utils/helpers/encrypter.js')
const TokenGenerator = require('../../utils/helpers/token-generator.js')
const env = require('../config/env.js')

module.exports = class LoginRouterComposer {
  static compose () {
    const tokenGenerator = new TokenGenerator(env.tokenSecret)
    const encrypter = new Encrypter()
    const updateAccessTokenRepository = new UpdateAccessTokenRepository()
    const loadUserByEmailRepository = new LoadUserByEmailRepository()
    const emailValidator = new EmailValidator()
    const authUseCase = new AuthUseCase({
      loadUserByEmailRepository,
      updateAccessTokenRepository,
      encrypter,
      tokenGenerator
    })
    return new LoginRouter({ authUseCase, emailValidator })
  }
}
