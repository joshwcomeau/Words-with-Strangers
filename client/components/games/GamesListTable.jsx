GamesListTable = React.createClass({
  gameLink(game) {
    let url = `/games/${game._id}`;
    return <a href={url}>{game.title}</a>;
  },
  games() {
    if ( _.isEmpty(this.props.games) ) {
      return (
        <tr>
          <td>
            <h5>Sorry, no active games.</h5>
            <p>Why not start one?</p>
          </td>
        </tr>
      );
    }

    return this.props.games.map( (game) => {
      return (
        <tr key={game._id}>
          <td>{this.gameLink(game)}</td>
          <td>{moment(game.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</td>
        </tr>
      );
    });
  },
  render() {

    return (
      <table>
        <tbody>
          {this.games()}
        </tbody>
      </table>
    );
  }
})
