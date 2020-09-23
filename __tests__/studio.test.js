const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('studio routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'))
  });

  it('creates a studio', async () => {
    return request(app)
      .post('/api/v1/studios')
      .send({
        name: 'Rabbit',
        city: 'Petersburg',
        state: 'Florida',
        country: 'Russia'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Rabbit',
          city: 'Petersburg',
          state: 'Florida',
          country: 'Russia'
        })
      })
  });
});
