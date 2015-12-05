SidePanelTurns = React.createClass({
  turns() {
    return Turns.find({
      gameId: this.props.gameId
    },{
      sort: {createdAt: -1}
    }).fetch();
  },

  playerName(turn) {
    return Meteor.users.findOne( turn.playerId ).username;
  },

  generateTurns() {
    return this.turns().map( (turn) => {
      return (
        <div className="side-panel-turn" key={turn._id}>
          <span className="turn-player-name">{this.playerName(turn)}</span>
          spelled
          <span className="turn-word">{turn.word}</span>
          for
          <span className="turn-points">{turn.points.total}</span>
          points.
        </div>
      )
    });
  },

  render() {
    return (
      <div className="side-panel-turns">
        { this.generateTurns() }
      </div>
    )
  }
});
