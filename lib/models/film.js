const pool = require('../utils/pool');

module.exports = class Film {
  id;
  title;
  studioId;
  released;
  players;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.studioId = row.studio_id;
    this.released = row.released;
    this.players = row.players;
  }

  static async insert(film) {
    const { rows } = await pool.query(`
    INSERT INTO films (title, studio_id, released, players)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [film.title, film.studioId, film.released, film.players]);

    return new Film(rows[0]);
  }
};
