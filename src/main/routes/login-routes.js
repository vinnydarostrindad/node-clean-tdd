const loginRouter = require('../composers/login-router-composer.js')

module.exports = async router => {
  router.post('/login', loginRouter)
}
