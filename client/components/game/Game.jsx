// Our top-level, data-managing component. It subscribes to our publication
// and passes all relevant Meteor data down into its children, so that
// the children can be 100% state/prop based.
DragDropContext = ReactDnD.DragDropContext;
Html5Backend    = ReactDnDHTML5Backend;

Game = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data   = {};
    let gameId = this.props.gameId;

    let handle = Meteor.subscribe('game', gameId);
    if ( handle.ready() ) {
      data.game = Games.findOne(gameId);

      data.boardTiles = Tiles.find({
        location: 'board',
        gameId:  gameId
      }).fetch();

      data.rackTiles = Tiles.find({
        location: 'rack',
        gameId: gameId
      }).fetch();

      data.players = Meteor.users.find({
        _id: { $in: data.game.playerIds }
      }).fetch();
    }

    return data;
  },

  renderGame() {
    //
    return (
      <div id="game">
        <SidePanel game={this.data.game} players={this.data.players} />
        <Board game={this.data.game} tiles={this.data.boardTiles} />
        <TileRack game={this.data.game} tiles={this.data.rackTiles} />
        <Controls game={this.data.game} />
      </div>
    )
  },

  render() {
    return this.data.game ? this.renderGame() : <Loading />;
  }
});

Game = DragDropContext(Html5Backend)(Game);
