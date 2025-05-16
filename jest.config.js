/** @type {import('jest').Config} */
const config = {
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/src/**/*.js']
}

module.exports = config
