Meteor.smartPublish('game', function(gameId) {
  // Fetch all players of this game.
  // Publish only the fields we need.
  addPlayersDependencyToGame.call(this);

  return [
    Games.find({ _id: gameId }),
    Turns.find({ gameId: gameId}),
    Tiles.find({
      gameId: gameId,
      $or: [
        // Show tiles placed from previous turns, regardless of player
        { location: 'board', turnId: { $exists: true } },
        // Show this player's rack and tentative board tiles
        { playerId: this.userId }
      ]
    })
  ];
})

Meteor.smartPublish('games', function(limit = 10) {
  // Fetch all players of a given game.
  // Publish only the fields we need.
  addPlayersDependencyToGame.call(this);

  return [
    Games.find({ status: 'waiting' })
  ];
});

function addPlayersDependencyToGame(userField, collection) {
  // addDependency is a method provided by SmartPublish. Whenever an item
  // of collection is published, it runs this dependency function to find
  // any associated users, and returns the correct fields (profile and username).
  this.addDependency('games', 'playerIds', function(event) {
    return Meteor.users.find({
      _id: { $in: event.playerIds }
    }, {
      fields: { profile: 1, username: 1 }
    });
  });
}
