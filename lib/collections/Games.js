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

Games.after.insert( function(userId, doc) {
  // give the creator 8 starter letters
  Modules.gameLogic.addTilesToPlayerRack({
    playerId: userId,
    gameId:   doc._id,
    num:      8
  });
});


Meteor.methods({
  createNewGame: function( title = "Test Game" ) {
    Games.insert({
      title:      title,
      playerIds:  [this.userId],
      playerTurn: this.userId,
      status:     "waiting"
    });
  }
});
