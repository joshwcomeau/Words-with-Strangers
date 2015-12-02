"use strict";

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
      x: x,
      y: y,
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

    if ( !activeAxis ) throw new Error("Tiles aren't in a straight line!");

    // We know which letters are ours, and we know which axis we're on.
    // We don't know, though, if our letters make up the whole word.
    //
    // For example, imagine this:
    // _ _ _ F R E E _ _ _ _
    // We come along, and add 3 letters:
    // _ _ _ F R E E D O M _
    //               ^ ^ ^
    // In this case, our word is 'DOM', but that's not the whole story!
    //
    // The solution to this problem is to rewind to the earliest letter
    // in the sequence, and then move forward through all the letters.
    let allTilesInWord = rewindAndCaptureWord({
      axis:   activeAxis,
      tiles:  activeTiles,
      gameId: gameId
    });

    let letters = _.pluck(allTilesInWord, 'letter');
    let word    = letters.join('');


    let points = calculateWordScore(allTilesInWord);
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

// Figure out whether the tiles form a horizontal or vertical line.
// RETURNS: either:
//   - a String (enum: ['x', 'y']) if the move is valid, or
//   - a Boolean (false) if the move is invalid.
function findActiveAxis(tiles) {
  const deltaX = getDeltaOfAxis(tiles, 'x');
  const deltaY = getDeltaOfAxis(tiles, 'y');

  // If all the tiles are on the same row/column, the delta for that axis
  // will be zero. If both axes are more than zero, it means we have tiles
  // that aren't neatly in a single row or column.
  if ( deltaX && deltaY ) return false;

  return deltaX ? 'x' : 'y';
}

// Figure out how many tiles apart the highest/lowest tile are, on a given axis
// RETURNS: An integer
function getDeltaOfAxis(tiles, axis) {
  const axisPoints = tiles.map( tile => tile[axis]).sort();
  return _.last(axisPoints) - _.first(axisPoints);
}

// RETURNS: An integer
function calculateWordScore(word) {
  let letters = _.pluck(word, 'letter');
  return _.reduce(letters, (sum, letter) => {
    return sum + LETTER_POINTS[letter];
  }, 0);
}

// RETURNS: An array of Tile objects.
function rewindAndCaptureWord({ axis: axis, tiles: tiles, gameId: gameId}) {
  // The idea here is I have a sequence of tiles on an axis, and I need
  // to find any missing tiles to fulfill the word.
  // Imagine this row:
  // _ C * E E * _ _
  // We have C, E and E in non-sequence, and the board has 2 letters
  // from a previous round. Our job is to find all letters in this word,
  // and return an array of the Tile objects.

  // VARIABLES
  let wordTiles = [];       // our returned list of Tiles
  let cursorTile;           // A track-keeping tile that we use for navigation.
  let earliestTile;         // The earliest tile we've seen. The start of the word.
  let currentPosition;      // integer. Axis position.
  let boardSize;            // integer. Number of tiles in a row.
  let activeAxisIndex;      // integer. 0 for 'x', 1 for 'y'.
  let inactiveAxisIndex;    // integer. 0 for 'x', 1 for 'y'
  let inactiveAxis;         // String. 'x' or 'y'. Opposite of 'axis'.
  let inactiveAxisPosition  // integer. Holds the static axis position.
  let tileObject;           // Holds a Mongo query to find a specific tile

  // TODO: Store the boardSize on the Game object, that way we can change
  // the size without affecting pre-existing games.
  boardSize = 13;

  // First, find the earliest letter.
  earliestTile = _.first( _.sortBy(tiles, tile => tile[axis]) );

  // Create a cursor tile that will traverse back away from the earliest
  // letter. It's called a cursor simply because it moves along a row.
  cursorTile = earliestTile;

  // Since our inactive axis never changes, let's just store it now.
  inactiveAxis = axis !== 'x' ? 'x' : 'y';
  inactiveAxisPosition = cursorTile[inactiveAxis];


  // Now, rewind until we either find an empty square,
  // or we hit the edge of the board.
  while ( cursorTile && cursorTile[axis] > 0) {
    // We've found a new earliest!
    earliestTile = cursorTile;

    tileObject = {
      gameId: gameId,
      location: 'board'
    }
    tileObject[axis] = cursorTile[axis]-1;
    tileObject[inactiveAxis] = inactiveAxisPosition;

    cursorTile = Tiles.findOne(tileObject);
  }

  // Reset our cursor tile, since it was possibly unset when we found a
  // blank square.
  cursorTile = earliestTile;

  // cursorTile now holds the earliest tile in the row.
  // We can advance forwards through the row, adding tiles to our array :)
  while ( cursorTile && cursorTile[axis] < boardSize) {
    wordTiles.push( cursorTile );

    tileObject = {
      gameId: gameId,
      location: 'board'
    }
    tileObject[axis] = cursorTile[axis]+1;
    tileObject[inactiveAxis] = inactiveAxisPosition;

    cursorTile = Tiles.findOne(tileObject);
    debugger;
  }

  console.log(wordTiles);
  return wordTiles;
}
