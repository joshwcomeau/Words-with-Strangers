Meteor.publish('game', function(gameId) {
  // TODO: limit rack tiles to current user!
  return [
    Games.find({ _id: gameId }),
    Tiles.find({ gameId: gameId })
  ];
})

Meteor.publish('games', function() {
  return [
    Games.find({ status: 'waiting' })
  ];
});
