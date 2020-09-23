const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('studio routes', () => {
  it('creates a studio', async() => {
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
        });
      });
  });

  it('gets all studios', async() => {
    return await request(app)
      .get('/api/v1/studios')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            id: expect.any(String),
            name: expect.any(String)
          },
          {
            id: expect.any(String),
            name: expect.any(String)
          },
          {
            id: expect.any(String),
            name: expect.any(String)
          },
          {
            id: expect.any(String),
            name: expect.any(String)
          },
          {
            id: expect.any(String),
            name: expect.any(String)
          }
        ]));
      });
  });
});
