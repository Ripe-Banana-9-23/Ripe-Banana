const Studio = require('../lib/models/studio');
const Actor = require('../lib/models/actor');
const Reviewer = require('../lib/models/reviewer');
const Review = require('../lib/models/review');
const chance = require('chance').Chance();

const studioSeed = async({ count = 5 } = {}) => {
  const studiosToCreate = [...Array(count)].map(() =>
    ({
      name: chance.animal(),
      city: chance.city(),
      state: chance.state(),
      country: chance.country()
    }));
 
  await Promise.all(studiosToCreate.map(studio =>
    Studio.insert(studio)
  ));
};

const actorSeed = async({ count = 5 } = {}) => {
  const actorsToCreate = [...Array(count)].map(() =>
    ({
      name: `${chance.first()} ${chance.last()}`,
      dob: chance.date(),
      pob: `${chance.city()}, ${chance.state()}`
    }));

  await Promise.all(actorsToCreate.map(actor => 
    Actor.insert(actor)
  ));
};

const reviewerSeed = async({ count = 5 } = {}) => {
  const reviewersToCreate = [...Array(count)].map(() =>
    ({
      name: `${chance.first()} ${chance.last()}`,
      company: chance.company()
    }));

  await Promise.all(reviewersToCreate.map(reviewer =>
    Reviewer.insert(reviewer)
  ));
};

const reviewSeed = async({ count = 5 } = {}) => {
  const reviewsToCreate = [...Array(count)].map(() =>
    ({
      rating: 5,
      review: chance.sentence(),
      reviewerId: 1
    }));
  await Promise.all(reviewsToCreate.map(review => 
    Review.insert(review)));
};

module.exports = {
  studioSeed,
  actorSeed,
  reviewerSeed,
  reviewSeed
};

