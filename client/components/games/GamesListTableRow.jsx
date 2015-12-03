GamesListTableRow = React.createClass({
  joinGame() {
    let gameId = this.props.game._id;
    Meteor.call('joinGame', gameId, Meteor.userId(), (err, response) => {
      if ( err ) return console.error("Failed joining game:", err);
      console.log("Join game resp", response);

      FlowRouter.go('game', {gameId});
    });
  },
  generatePlayerCell() {
    let players = this.props.game.players();
    return players.map( player => (
      <a href="#" className="game-list-player clearfix" key={player._id}>
        <div className="player-avatar" style={{
          backgroundImage: `url('${player.profile.photo}')`
        }}></div>
        {player.username}
      </a>
    ));
  },
  gameLink() {
    return FlowRouter.path('game', {gameId: this.props.game._id});
  },
  render() {
    let game = this.props.game;
    return (
      <tr>
        <td><strong><a href={this.gameLink()}>{game.title}</a></strong></td>
        <td>{this.generatePlayerCell()}</td>
        <td>{moment(game.createdAt).format('MMM Do, h:mm a')}</td>
        <td>
          {game.status}
        </td>
        <td>
          <button onClick={this.joinGame}>Join Game</button>
        </td>
      </tr>
    );
  }
});
