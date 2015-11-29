BoardSquare = React.createClass({
  dropTile() {
    let letter = _.sample(['A','B','C','D','E','F','G','H','I','J','K','L']);

    // This isn't a reactive environment, but it doesn't need to be; the parent
    // component listens for changes to the collection. We can still update it
    // from here.
    Tiles.insert({
      letter: letter,
      location: 'board',
      position: [this.props.x, this.props.y],
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
