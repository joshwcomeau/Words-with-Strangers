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
      // We want OUR turns to have a special className
      turnClassName = "side-panel-turn"
      if ( turn.playerId === Meteor.userId() ) turnClassName += " my-turn"
      return (
        <div className={turnClassName} key={turn._id}>
          <span className="turn-data turn-player-name">{this.playerName(turn)}</span>
          &nbsp;spelled&nbsp;
          <span className="turn-data turn-word">{turn.word}</span>
          &nbsp;for&nbsp;
          <span className="turn-data turn-points">{turn.points.total}</span>
          &nbsp;points.
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
