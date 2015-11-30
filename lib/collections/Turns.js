Turns = new Mongo.Collection("turns")

//----------------------- SCHEMA -----------------------\\
PointsSchema = new SimpleSchema({
  base:     { type: Number },
  bonus:    { type: Number, defaultValue: 0 },
  total:    { type: Number, autoValue: function() {
    let base  = this.siblingField("base");
    let bonus = this.siblingField("bonus");

    if ( !base.isSet || !bonus.isSet ) {
      throw new Meteor.Error(400, "Failed to provide a base score.")
    }

    return base.value + bonus.value;
  }}
});
TurnsSchema = new SimpleSchema({
  gameId:   { type: String },
  playerId: { type: String },
  word:     { type: String },
  points:   { type: PointsSchema }
});
Turns.attachSchema(TurnsSchema);


//----------------------- HOOKS ------------------------\\
Turns.after.insert(function(userId, doc) {
  // Assign the turnId to all active tiles in that word.
  Tiles.update({
    gameId:   doc.gameId,
    playerId: doc.playerId,
    position: 'board',
    turnId:   { $exists: false }
  }, {$set: {
    turnId:   doc._id
  }});

  // Set the game to the next opponent's turn!
  const game                = Games.findOne(doc.gameId);
  const numOfPlayers        = game.playerIds.length;
  const currentPlayerIndex  = game.playerIds.indexOf(userId);
  const nextPlayerIndex     = (currentPlayerIndex+1) % numOfPlayers;
  const nextPlayerId        = game.playerIds[nextPlayerIndex];


  Games.update(doc.gameId, { $set: {
    playerTurn: nextPlayerId
  }});
})


//---------------------- METHODS -----------------------\\
Meteor.methods({
  endTurn(turn) {
    // Add userId to the turn
    _.extend(turn, { playerId: this.userId });

    Turns.insert(turn);
  }
});
