const request = require('supertest');
const app = require('../lib/app');
require('../data/data-helpers');

describe('actor routes', () =>{
  it('creates an actor', async() => {
    return request(app)
      .post('/api/v1/actors')
      .send({
        name: 'Bugs Bunny',
        dob: '1940-04-29',
        pob: 'Burbank, CA'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Bugs Bunny',
          dob: '1940-04-29',
          pob: 'Burbank, CA'

        });
      });
  });

  it('gets all actors', async() => {
    return await request(app)
      .get('/api/v1/actors')
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
