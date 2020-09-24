const fs = require('fs');
const pool = require('../lib/utils/pool');
const { studioSeed, actorSeed, reviewerSeed } = require('./seed');

beforeEach(() => {
  return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
});

beforeEach(() => {
  return studioSeed();
});

beforeEach(() => {
  return actorSeed();
});

beforeEach(() => {
  return reviewerSeed();
});
