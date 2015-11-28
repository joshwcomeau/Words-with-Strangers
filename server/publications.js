Meteor.publish('game', function(gameId) {
  return Games.find({ _id: gameId });
})

Meteor.publish('games', function() {
  return Games.find({ isActive: true });
});
