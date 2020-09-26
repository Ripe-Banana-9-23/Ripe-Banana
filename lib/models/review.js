const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;
  reviewerId;
  filmId;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    this.review = row.review;
    this.reviewerId = row.reviewer_id;
    this.filmId = row.film_id;
  }

  static async insert(review) {
    const { rows } = await pool.query(`
    INSERT INTO reviews (rating, review, reviewer_id, film_id) 
    VALUES ($1, $2, $3, $4) 
    RETURNING *`,
    [review.rating, review.review, review.reviewerId, review.filmId
    ]
    );

    return new Review(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
    SELECT * FROM reviews ORDER BY rating DESC LIMIT 100`);

    return rows.map(row => new Review(row));
  }

  static async delete(id) {
    const { rows } = await pool.query('DELETE FROM reviews WHERE id=$1 RETURNING *', [id]);
    return new Review(rows[0]);
  }

  
};
