GamesListHeader = ({isLoggedIn}) => (
  <header>
    { generateNewButton(isLoggedIn) }
    <h4>Current Games</h4>
  </header>
);

function createGame() {
  Meteor.call('createNewGame', (err, gameId) => {
    if (err) return console.log("error creating game", err);
    FlowRouter.go('game', { gameId: gameId });
  })
}

function generateNewButton(isLoggedIn) {
  if ( isLoggedIn ) {
    return <button className="button" onClick={createGame}>Create New</button>
  } else {
    return <button className="button" disabled="true" onClick={createGame}>Log in to Create Games</button>
  }

}
