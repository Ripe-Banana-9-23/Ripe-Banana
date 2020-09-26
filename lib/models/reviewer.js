const pool = require('../utils/pool');
const Review = require('./review');

module.exports = class Reviewer {
  id;
  name;
  company;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert(reviewer) {
    const { rows } = await pool.query(
      `INSERT INTO reviewers (name, company)
            VALUES ($1, $2) RETURNING *`,
      [reviewer.name, reviewer.company]
    );

    return new Reviewer(rows[0]);
  }

  static async find() {
    const { rows } = await pool.query(`
      SELECT * FROM reviewers`);

    return rows.map(row =>
      new Reviewer(row)
    );
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT reviewers.*, array_to_json(array_agg(reviews.*)) 
    AS reviews FROM reviewers JOIN reviews 
    ON reviews.reviewer_id = reviewers.id
    WHERE reviewers.id=$1
    GROUP BY reviewers.id`, [id]);


    if(!rows[0]) return null;
    const reviewer = new Reviewer(rows[0]);
    const reviews = rows[0].reviews.map(review => new Review(review));

    return {
      ...reviewer, 
      reviews
    };
  }

  static async update(id, reviewer) {
    const { rows } = await pool.query(`
    UPDATE reviewers 
    SET name=$1, company=$2
    WHERE id=$3 
    RETURNING *`,
    [reviewer.name, reviewer.company, id]);

    return new Reviewer(rows[0]);
  }
};
