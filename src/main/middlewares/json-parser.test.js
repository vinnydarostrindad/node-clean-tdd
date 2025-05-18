const request = require('supertest')
const app = require('../config/app.js')

describe('JSON Parser Middleware', () => {
  test('Should parser body as JSON', async () => {
    app.post('/test_json_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_json_parser')
      .send({ name: 'Vinny' })
      .expect({ name: 'Vinny' })
  })
})
