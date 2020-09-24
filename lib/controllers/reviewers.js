const { Router } = require('express');
const Reviewer = require('../models/reviewer');

module.exports = Router()
  .post('/', (req, res, next) => {
    Reviewer
      .insert(req.body)
      .then(reviewer => res.send(reviewer))
      .catch(next);
  });
