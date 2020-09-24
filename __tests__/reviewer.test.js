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
});
