SidePanelPlayers = React.createClass({
  renderPlayers() {
    return this.props.players.map( (player) => {
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
