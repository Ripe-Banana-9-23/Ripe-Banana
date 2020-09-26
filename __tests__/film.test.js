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

  it('gets all films', () => {
    return request(app)
      .get('/api/v1/films')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            id: expect.any(String),
            title: expect.any(String),
            released: expect.any(Number),
            studio: { id: expect.any(String), name: expect.any(String) }
          }
        ]));
      });
  });

  it('gets films by id', () => {
    return request(app)
      .get('/api/v1/films/1')
      .then(res => {
        expect(res.body).toEqual(
          {
            id: expect.any(String),
            title: expect.any(String),
            released: expect.any(Number),
            studio: { id: expect.any(String), name: expect.any(String) },
            players: expect.arrayContaining([{ id: expect.any(String), role: expect.any(String), actor: expect.any(String) }])
          }
        );
      });
  });
});
