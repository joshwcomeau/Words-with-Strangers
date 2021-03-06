GamesListTable = ({games}) => (
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Players</th>
        <th>Created</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {generateList(games)}
    </tbody>
  </table>
);

generateList = function(games) {
  if ( _.isEmpty(games) ) {
    return (
      <tr>
        <td>
          <h5>Sorry, no active games.</h5>
          <p>Why not start one?</p>
        </td>
      </tr>
    );
  }

  return games.map( (game) => (
    <GamesListTableRow key={game._id} game={game} />
  ));
}
