BoardSquare = React.createClass({
  dropTile() {
    // For now, we're going to implement clicking to place the first time
    // from the rack onto the clicked square.
    let selectedTile = Tiles.findOne({ location: 'rack' }, {sort: { position: 1 }});

    Tiles.update(selectedTile._id, {
      $set: {
        location: 'board',
        position: [this.props.x, this.props.y]
      }
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
