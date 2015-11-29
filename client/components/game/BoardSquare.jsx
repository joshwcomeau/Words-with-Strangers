BoardSquare = React.createClass({
  dropTile() {
    // For now, we're going to implement clicking to place the first time
    // from the rack onto the clicked square.
    let selectedTile = Tiles.findOne({ location: 'rack' }, {sort: { position: 1 }});

    // Move the tile to this place on the board
    Tiles.update(selectedTile._id, {
      $set: {
        location: 'board',
        position: [this.props.x, this.props.y]
      }
    });

    // Generate a new tile for the user
    Modules.gameLogic.addTilesToPlayerRack({
      playerId: Meteor.userId(),
      gameId: this.props.gameId
    });
  },
  render() {
    return (
      <div className="board-square" onClick={this.dropTile}>
        { this.props.children ? <Tile tile={this.props.children} /> : null }
      </div>
    );
  }
});
