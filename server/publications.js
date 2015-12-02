Meteor.publish('game', function(gameId) {
  return [
    Games.find({ _id: gameId }),
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

Meteor.publish('games', function() {
  return [
    Games.find({ status: 'waiting' })
  ];
});
