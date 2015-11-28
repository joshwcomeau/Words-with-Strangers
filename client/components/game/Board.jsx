const BOARD_SIZE = 12;

Board = React.createClass({
  findTileAtCoords(x, y) {
    return _.find(this.props.tiles, tile => {
      return tile.position[0] === x && tile.position[1] === y;
    });
  },
  renderSquare(num) {
    // Figure out this square's co-ordinates.
    const x = num % BOARD_SIZE;
    const y = Math.floor(num / BOARD_SIZE);

    return (
      <BoardSquare key={x + '-' + y} x={x} y={y} gameId={this.props.game._id}>
        {this.findTileAtCoords(x,y)}
      </BoardSquare>
    );

  },
  render() {
    let squares = [];

    for ( let num = 0; num < (BOARD_SIZE * BOARD_SIZE); num++ ) {
      squares.push( this.renderSquare(num) );
    }

    return (
      <div id="board">
        {squares}
      </div>
    );
  }
})
