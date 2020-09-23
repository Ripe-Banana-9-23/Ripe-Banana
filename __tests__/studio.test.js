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

  it('gets a studio by id', async() => {
    return await request(app)
      .get('/api/v1/studios/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          name: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          country: expect.any(String)          
        });
      });
  });
});
