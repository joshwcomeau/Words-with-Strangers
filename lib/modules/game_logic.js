Modules.gameLogic = {
  addTilesToPlayerRack({playerId: playerId, gameId: gameId, num: num = 1} = {}) {
    _.times(num, () => {
      let letter = selectRandomLetter();
      let letterPoints = LETTER_POINTS[letter];

      Tiles.insert({
        playerId: playerId,
        gameId:   gameId,
        letter:   letter,
        points:   letterPoints,
        location: 'rack'
      });

    });
  },
  dropTile(tile, {x: x, y: y, gameId: gameId}) {
    // TODO: Validate that they're allowed to do this (their turn, their new letters exclusively)

    // Thankfully, we don't have to deal with any DOM manipulation. All we
    // need to do is define what happens to the Tile: It gets its position
    // changed.
    Tiles.update(tile._id, { $set: {
      position: [x, y],
      location: 'board'
    }});

    // We also need to ensure that they receive a new letter, to replace the
    // placed one (TODO: Move this to end-of-turn)
    this.addTilesToPlayerRack({
      playerId: Meteor.userId(),
      gameId: gameId
    });
  }
};




// Private stuff

// Letter distribution, as used by Scrabble. Number represents how many of a
// given tile should exist in a set of tiles.
const LETTER_DISTRIBUTION = {
  A: 9,  B: 2,  C: 2,  D: 4,  E: 12, F: 2,
  G: 3,  H: 2,  I: 9,  J: 1,  K: 1,  L: 4,
  M: 2,  N: 6,  O: 8,  P: 2,  Q: 1,  R: 6,
  S: 4,  T: 6,  U: 4,  V: 2,  W: 2,  X: 1,
  Y: 2,  Z: 1
};

// Letter points: How many points a given letter is worth.
const LETTER_POINTS = {
  A: 1,  B: 3,  C: 3,  D: 2,  E: 1,  F: 4,
  G: 2,  H: 4,  I: 1,  J: 8,  K: 5,  L: 1,
  M: 3,  N: 1,  O: 1,  P: 3,  Q: 10, R: 1,
  S: 1,  T: 1,  U: 1,  V: 4,  W: 4,  X: 8,
  Y: 4,  Z: 10
};

// Turn that object into an array, with the letter repeated N times.
// eg. ['A','A','A','A','A','A','A','A','A','B','B','C'...]
const LETTERS = generateDistributionArray(LETTER_DISTRIBUTION);



function generateDistributionArray(distribution) {
  let keys = _.keys(distribution);

  return _.reduce(keys, (result, letter) => {
    _.times( distribution[letter], () => result.push(letter) )
    return result
  }, []);
}

function selectRandomLetter() {
  return _.sample(LETTERS);
}
