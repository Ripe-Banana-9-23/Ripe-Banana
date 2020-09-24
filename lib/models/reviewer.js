const pool = require('../utils/pool');

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
    )
  }
};
