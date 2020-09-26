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
    WITH unnested_cast AS(
      SELECT id, studio_id, released, title, jsonb_array_elements(films.players) as "players" FROM films)

    SELECT
    unnested_cast.id,
    unnested_cast.title,
    unnested_cast.released,
    unnested_cast.studio_id,
    array_to_json(array_agg(actors.name)) as "players",
    array_to_json(array_agg(actors.id)) as "playerId",
    array_to_json(array_agg(DISTINCT unnested_cast.players ->> 'role')) as "role",
    array_to_json(array_agg(DISTINCT studios.name)) as "studio",
    array_to_json(array_agg(DISTINCT reviews.*)) as "reviews",
    array_to_json(array_agg(DISTINCT(SELECT reviewers.name FROM reviewers WHERE reviewers.id = reviews.reviewer_id))) as "reviewers"

    FROM unnested_cast

    JOIN actors ON actors.id = (unnested_cast.players ->> 'actorId'):: BIGINT
    JOIN studios ON studios.id = unnested_cast.studio_id
    JOIN reviews ON reviews.film_id = unnested_cast.id

    WHERE unnested_cast.id = ${id}

    GROUP BY unnested_cast.id, unnested_cast.title, unnested_cast.released, unnested_cast.studio_id
  `);

    const castArr = rows[0].players.map((player, i) => ({
      id: rows[0].playerId[i],
      role: rows[0].role[i],
      actor: player
    }));
    const reviewsArr = rows[0].reviews.map((review, i) => ({
      id: review.id,
      rating: review.rating,
      review: review.review,
      reviewer: { id: review.reviewer_id, name: rows[0].reviewers[i] }
    }));


    if (!rows[0]) return null;
    else return {
      id: rows[0].id,
      title: rows[0].title,
      released: rows[0].released,
      studio: { id: rows[0].studio_id, name: rows[0].studio[0] },
      cast: castArr,
      reviews: reviewsArr
    };

  }
};

