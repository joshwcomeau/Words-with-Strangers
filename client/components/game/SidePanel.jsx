SidePanel = ({game, players}) => (
  <div id="side-panel">
    <SidePanelHeader title={game.title} />
    <SidePanelPlayers players={players} gameId={game._id} />
    <SidePanelTurns />
  </div>
);
