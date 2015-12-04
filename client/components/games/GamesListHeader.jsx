GamesListHeader = ({isLoggedIn}) => (
  <header>
    { isLoggedIn ? generateNewButton() : null }
    <h4>Current Games</h4>
  </header>
);

function createGame() {
  Meteor.call('createNewGame', (err, gameId) => {
    if (err) return console.log("error creating game", err);
    FlowRouter.go('game', { gameId: gameId });
  })
}

function generateNewButton() {
  return <button className="button" onClick={createGame}>Create New</button>
}
