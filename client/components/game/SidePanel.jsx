SidePanel = ({game}) => (
  <div id="side-panel">
    <SidePanelHeader title={game.title} />
    <SidePanelPlayers />
    <SidePanelTurns />
  </div>
);
