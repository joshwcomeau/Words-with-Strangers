GamesListTableRow = React.createClass({
  joinGame() {
    let gameId = this.props.game._id;
    Meteor.call('joinGame', gameId, Meteor.userId(), (err, response) => {
      if ( err ) return console.error("Failed joining game:", err);
      console.log("Join game resp", response);

      FlowRouter.go('game', {gameId});
    });
  },

  render() {
    let game = this.props.game;
    return (
      <tr>
        <td><strong>{game.title}</strong></td>
        <td>{moment(game.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
        <td>
          <button onClick={this.joinGame}>Join Game</button>
        </td>
      </tr>
    );
  }
});
