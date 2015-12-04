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
    let game = this.props.game;
    let url = FlowRouter.path('game', {gameId: game._id});

    if ( Meteor.userId() ) {
      return <a href={url}>{game.title}</a>
    } else {
      return game.title
    }
  },
  render() {
    let game = this.props.game;
    return (
      <tr>
        <td><strong>{this.gameLink()}</strong></td>
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
