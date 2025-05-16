module.exports = class AnauthorizedError extends Error {
  constructor (paramName) {
    super('Unauthorized')
    this.name = 'UnauthorizedError'
  }
}
