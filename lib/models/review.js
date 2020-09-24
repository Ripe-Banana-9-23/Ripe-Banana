const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;
  reviewerId;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    this.review = row.review;
    this.reviewerId = row.reviewer_id;
  }

  static async insert(review) {
    const { rows } = await pool.query(`
    INSERT INTO reviews (rating, review, reviewer_id) 
    VALUES ($1, $2, $3) 
    RETURNING *`,
    [review.rating, review.review, review.reviewerId
    ]
    );

    return new Review(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
    SELECT * FROM reviews ORDER BY rating DESC LIMIT 100`);

    return rows.map(row => new Review(row));
  }
};
