Games = new Mongo.Collection("games");

//----------------------- SCHEMA -----------------------\\
Games.attachSchema( new SimpleSchema({
  title:      { type: String },
  playerIds:  { type: [String] },
  playerTurn: { type: String },
  status:     { type: String, allowedValues: [
    "waiting",
    "playing",
    "ended",
    "abandoned"
  ] },

  // Timestamps
  createdAt:  SchemaHelpers.createdAt,
  updatedAt:  SchemaHelpers.updatedAt

}));


//---------------------- HELPERS -----------------------\\
Games.helpers({
  players() {
    return Meteor.users.find({ _id: { $in: this.playerIds} }).fetch();
  }
})


//----------------------- HOOKS ------------------------\\
Games.after.insert( function(playerId, doc) {
  Modules.gameLogic.addTilesToPlayerRack({
    playerId,
    gameId: doc._id,
    num: Constants.MAX_TILES
  });
});


//---------------------- METHODS -----------------------\\
Meteor.methods({
  createNewGame: function( title = "Test Game" ) {
    return Games.insert({
      title:      title,
      playerIds:  [this.userId],
      playerTurn: this.userId,
      status:     "waiting"
    });
  },
  joinGame: function( gameId, playerId ) {
    Modules.gameLogic.addTilesToPlayerRack({
      playerId, gameId, num: Constants.MAX_TILES
    });
    return Games.update(gameId, { $push: {
      playerIds: playerId
    }});
  }
});
