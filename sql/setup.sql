DROP TABLE IF EXISTS studios, actors, reviewers, reviews;

CREATE TABLE studios (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  country TEXT NOT NULL
);

CREATE TABLE actors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  dob TEXT NOT NULL,
  pob TEXT NOT NULL
);

CREATE TABLE reviewers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL
);

CREATE TABLE reviews(
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  rating VARCHAR (140) NOT NULL,
  review TEXT NOT NULL
);

SELECT
	books.*,
	array_to_json(array_agg(book_pages.*)) AS pages
FROM
	books
JOIN book_pages
	ON books.id = book_pages.book_id
GROUP BY books.id;