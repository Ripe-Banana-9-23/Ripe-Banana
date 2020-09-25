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

  static async find() {
    const { rows } = await pool.query(`
    SELECT films.id, studio_id, title, released, name
    FROM films
    JOIN studios
    ON studios.id = films.studio_id
    `);

    const films = rows.map(row => ({
      id: row.id,
      title: row.title,
      released: row.released
    }));

    const studios = rows.map(row => ({
      id: row.studio_id,
      name: row.name
    }));

    return films.map((film, i) => ({
      ...film,
      studio: studios[i]
    }));
  }

  static async findById(id) {
    const { rows } = await pool.query(`
    SELECT title, released, studio_id, studio.name, players`)
  }
};

