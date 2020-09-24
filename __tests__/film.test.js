const request = require('supertest');
const app = require('../lib/app');
require('../data/data-helpers');

describe('film routes', () => {
  it('creates a film', () => {
    return request(app)
      .post('/api/v1/films')
      .send({
        title: 'The Great Escape',
        studioId: 2,
        released: 1950,
        players: { players: [{ role: 'Lightning McQueen', actor: 'Steve McQueen' }] }
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          title: 'The Great Escape',
          studioId: '2',
          released: 1950,
          players: { players: [{ role: 'Lightning McQueen', actor: 'Steve McQueen' }] }
        });
      });
  });
});
