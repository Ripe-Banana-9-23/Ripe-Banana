const Studio = require('../lib/models/studio');
const Actor = require('../lib/models/actor');
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

module.exports = {
  studioSeed,
  actorSeed

};

