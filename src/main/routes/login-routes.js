const loginRouter = require('../composers/login-router-composer.js')
const ExpressRouterAdapter = require('../adapters/express-router-adapter.js')

module.exports = async router => {
  router.post('/login', ExpressRouterAdapter.adapt(loginRouter))
}
