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
  },

  submitWord(gameId) {
    // First step is to figure out which tiles of mine are out on the board,
    // not part of a previous turn.
    let activeTiles = Tiles.find({
      gameId: gameId,
      location: 'board',
      turnId: { $exists: false }
    }).fetch();


    // Figure out which axis we're working in.
    // This will return 'false' if the currently active tiles span more than
    // a single axis (they aren't all neatly in a single row or column).
    let activeAxis = findActiveAxis(activeTiles);

    // While the axes are named 'x' and 'y', they're stored in an Array
    // eg. [x, y]. If I want to fetch them, I'll need to use the indexes
    // 0 and 1 for x and y, respectively.
    let activeAxisIndex = activeAxis === 'x' ? 0 : 1;

    if ( !activeAxis ) throw new Error("Tiles aren't in a straight line!");

    // Now, we need to work out whether there are any connecting, previously-
    // placed words. The easiest way to do this is to walk the perimeter of the
    // selected area, adding any tiles to an array. Once we have all touching
    // tiles, we can look up their respective words, and add the touching
    // piece(s) to that word to check for validity.



    // Sort the tiles so we know what the selected word is, and pluck it out.
    activeTiles = _.sortBy(activeTiles, (tile) => tile.position[activeAxisIndex]);
    let word = _.pluck(activeTiles, 'letter').join('');

    let points = calculateWordScore(word);
    console.log("That word is worth", points)

    // TODO: Check that it's a valid dictionary word. Probably want to send
    // it to the server for this.

    // TODO: Bonus points tiles!

    // It's good! Mark this turn as complete.
    const turnObject = {
      word:   word,
      gameId: gameId,
      points: {
        base:   points,
      }
    };


    Meteor.call('endTurn', turnObject, (err, result) => {
      if (err) return console.error("Problem ending turn:", err);
    });
  }
};




// Private stuff

// INITIALIZATION - letter generation and selection
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

// ABSTRACTIONS - quick tasks needed by the public methods

function findActiveAxis(tiles) {
  const deltaX = getDeltaOfAxis(tiles, 0);
  const deltaY = getDeltaOfAxis(tiles, 1);

  // If all the tiles are on the same row/column, the delta for that axis
  // will be zero. If both axes are more than zero, it means we have tiles
  // that aren't neatly in a single row or column.
  if ( deltaX && deltaY ) return false;

  return deltaX ? 'x' : 'y';
}

// Figure out how many tiles apart the highest/lowest tile are, on a given axis
function getDeltaOfAxis(tiles, axis) {
  const axisPoints = tiles.map( tile => tile.position[axis]).sort();
  return _.last(axisPoints) - _.first(axisPoints);

}

function calculateWordScore(word) {
  let letters = word.split('');
  return _.reduce(letters, (sum, letter) => {
    return sum + LETTER_POINTS[letter];
  }, 0);
}
