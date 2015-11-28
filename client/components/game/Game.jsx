// Our top-level, data-managing component. It subscribes to our publication
// and passes all relevant Meteor data down into its children, so that
// (hopefully) the children can be 100% state/prop based.
Game = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data   = {};
    let gameId = this.props.gameId;
    // TODO: Connect this to real data
    let handle = Meteor.subscribe('game', gameId);
    if ( handle.ready() ) {
      data.game = Games.findOne(gameId);
      data.tiles = Tiles.find({ gameId: gameId }).fetch();
    }

    return data;
  },

  renderGame() {
    //
    return (
      <div id="game">
        <Board {...this.data} />
        <TileRack />

        <SidePanel game={this.data.game} />
      </div>
    )
  },

  render() {
    return this.data.game ? this.renderGame() : <Loading />;
  }
});
