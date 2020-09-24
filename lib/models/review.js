const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    this.review = row.review;
  }

  static async insert(review) {
    const { rows } = await pool.query(`
    INSERT INTO reviews (rating, review) 
    VALUES ($1, $2) 
    RETURNING *`,
      [review.rating, review.review]
    );

    return new Review(rows[0]);
  }
}