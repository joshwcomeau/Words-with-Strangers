// Our top-level, data-managing component. It subscribes to our publication
// and passes all relevant Meteor data down into its children, so that
// (hopefully) the children can be 100% state/prop based.
Game = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    console.log("Get meteor data running");
    let data   = {};
    let gameId = this.props._id
    let handle = Meteor.subscribe('game', gameId);

    if ( handle.ready() ) data.game = Games.findOne(gameId)

    return data;
  },

  renderGame() {
    //
    return (
      <div>
        <Board game={this.data.game} />
        <TileRack />

        <SidePanel game={this.data.game} />
      </div>
    )
  },

  render() {
    return this.data.game ? this.renderGame() : <Loading />;
  }
});
