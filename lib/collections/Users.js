// The actual collection is defined by Meteor. Accessible by Meteor.users
let Users = Meteor.users;

Users.helpers({
  points(gameId) {
    // Find all of a player's turns, in a given game, and sum the points.
    return Turns.find({
      playerId: this._id, gameId: gameId
    }).fetch().reduce( (sum, turn) => {
      return sum += turn.points.total;
    }, 0);
  }
})
