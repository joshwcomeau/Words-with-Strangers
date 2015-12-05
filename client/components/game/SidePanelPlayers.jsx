SidePanelPlayers = React.createClass({
  renderPlayers() {
    // Sort players by whoever's winning.
    let players = _.sortBy(this.props.players, (player) => {
      return player.points(this.props.gameId);
    }).reverse();
    return players.map( (player) => {
      return (
        <div className="side-panel-player" key={player._id}>
          <div className="avatar" style={{backgroundImage: `url('${player.profile.photo}')`}}></div>
          <div className="username">{player.username}</div>
          <div className="points">{player.points(this.props.gameId)}</div>
        </div>
      );
    });
  },
  render() {
    return (
      <div className="side-panel-players">{this.renderPlayers()}</div>
    );
  }
});
