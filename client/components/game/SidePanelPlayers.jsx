SidePanelPlayers = React.createClass({
  renderPlayers() {
    return this.props.players.map( (player) => {
      return (<div className="side-panel-player" key={player._id}>
        {player.username} - {player.points(this.props.gameId)}
      </div>);
    });
  },
  render() {
    return (
      <div className="side-panel-players">{this.renderPlayers()}</div>
    );
  }
});
