Meteor.publish('game', function(gameId) {
  // TODO: limit tiles to current user!
  return [
    Games.find({ _id: gameId }),
    Tiles.find({ gameId: gameId })
  ];
})

Meteor.publish('games', function() {
  return [
    Games.find({ isActive: true })
  ];
});
