const request = require('supertest');
const app = require('../lib/app');
require('../data/data-helpers');

describe('review routes', () => {
  it('create a new review', () => {
    return request(app)
      .post('/api/v1/reviews')
      .send({
        rating: 4.9238748932,
        review: 'This is a really cool movie',
        reviewerId: 1
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          rating: 4.9238748932,
          review: 'This is a really cool movie',
          reviewerId: '1'
        });
      });
  });

  it('gets all reviews', () => {
    return request(app)
      .get('/api/v1/reviews')
      .then(res => {
        expect(res.body).toEqual(expect.arrayContaining([
          {
            id: '1',
            rating: expect.any(Number),
            review: expect.any(String),
            reviewerId: expect.any(String)
          }
        ]));
      });
  });
});
