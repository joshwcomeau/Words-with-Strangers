// Our top-level, data-managing component. It subscribes to our publication
// and passes all relevant Meteor data down into its children, so that
// the children can be 100% state/prop based.
Game = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data   = {};
    let gameId = this.props.gameId;

    let handle = Meteor.subscribe('game', gameId);
    if ( handle.ready() ) {
      data.game = Games.findOne(gameId);

      // Tiles with a 'position' attribute belong on the board
      data.boardTiles = Tiles.find({
        location: 'board',
        gameId:  gameId
      }).fetch();

      data.rackTiles = Tiles.find({
        location: 'rack',
        gameId: gameId
      }).fetch();

      // TODO: Move this into a collection hook, when game is created
      if ( _.isEmpty(data.rackTiles) ) {
        console.log("ADding tiles");
        ['L','O','T','S','T','I','L','E'].forEach( (letter, index) => {
          Tiles.insert({
            letter: letter,
            gameId: gameId,
            playerId: Meteor.userId(),
            position: index,
            location: 'rack',
            points: 1
          })
        });
      }

    }


    return data;
  },

  renderGame() {
    //
    return (
      <div id="game">
        <SidePanel game={this.data.game} />
        <Board game={this.data.game} tiles={this.data.boardTiles} />
        <TileRack game={this.data.game} tiles={this.data.rackTiles} />
      </div>
    )
  },

  render() {
    return this.data.game ? this.renderGame() : <Loading />;
  }
});
