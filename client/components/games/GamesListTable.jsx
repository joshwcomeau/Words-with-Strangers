GamesListTable = React.createClass({
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

    return this.props.games.map( (game) => (
      <GamesListTableRow key={game._id} game={game} />
    ));
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
