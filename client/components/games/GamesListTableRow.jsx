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
    let players = this.props.game.players
  },
  render() {
    let game = this.props.game;
    return (
      <tr>
        <td><strong>{game.title}</strong></td>
        <td>{this.generatePlayerCell()}</td>
        <td>{moment(game.createdAt).format('MMM Do, h:mm a')}</td>
        <td>
          <button onClick={this.joinGame}>Join Game</button>
        </td>
      </tr>
    );
  }
});
