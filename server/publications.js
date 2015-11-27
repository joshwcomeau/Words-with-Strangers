Meteor.publish('game', function(gameId) {
  console.log("Publication hit!")
  return Games.find({ _id: gameId });
})
