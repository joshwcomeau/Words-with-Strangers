Games = new Mongo.Collection("games", {
  transform(doc) {
    return doc;
  }
});
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

Games.after.insert( function(playerId, doc) {
  Modules.gameLogic.joinGame({
    playerId,
    gameId: doc._id
  });
});


Meteor.methods({
  createNewGame: function( title = "Test Game" ) {
    return Games.insert({
      title:      title,
      playerIds:  [this.userId],
      playerTurn: this.userId,
      status:     "waiting"
    });
  }
});
