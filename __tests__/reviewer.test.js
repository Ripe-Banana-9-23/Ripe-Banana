const request = require('supertest');
const app = require('../lib/app');
require('../data/data-helpers');

describe('reviewer routes', () => {
  it('creates a reviewer', () => {
    return request(app)
      .post('/api/v1/reviewers')
      .send({
        name: 'Bucket McMovies',
        company: 'Leaky Hole Film Reviews'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Bucket McMovies',
          company: 'Leaky Hole Film Reviews'
        });
      });
  });

  it('finds all reviewers', () => {
    return request(app)
      .get('/api/v1/reviewers')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            id: expect.any(String),
            name: expect.any(String),
            company: expect.any(String)
          },
          {
            id: expect.any(String),
            name: expect.any(String),
            company: expect.any(String)
          },
          {
            id: expect.any(String),
            name: expect.any(String),
            company: expect.any(String)
          },
          {
            id: expect.any(String),
            name: expect.any(String),
            company: expect.any(String)
          },
          {
            id: expect.any(String),
            name: expect.any(String),
            company: expect.any(String)
          }
        ]));
      });
  });

  it('finds a reviewer by id', () => {
    return request(app)
      .get('/api/v1/reviewers/1')
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          name: expect.any(String),
          company: expect.any(String)
        });
      });
  });

  it('updates a reviewer by id', () => {
    return request(app)
      .put('/api/v1/reviewers/1')
      .send({
        id: '1',
        name: 'Silent Bob',
        company: 'Mall Rats Company'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: '1',
          name: 'Silent Bob',
          company: 'Mall Rats Company'
        });
      });
  });
});
