Meteor.publish('game', function(gameId) {
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
  this.addDependency('games', 'playerIds', function(event) {
    return Meteor.users.find({
      _id: { $in: event.playerIds }
    }, {
      fields: { profile: 1, username: 1 }
    });
  });

  return [
    Games.find({ status: 'waiting' })
  ];
});
