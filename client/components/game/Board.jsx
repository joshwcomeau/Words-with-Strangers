const BOARD_SIZE = 13;

Board = React.createClass({
  findTileAtCoords(x, y) {
    return _.find(this.props.tiles, tile => {
      return tile.x === x && tile.y === y;
    });
  },
  renderSquare(num) {
    // Figure out this square's co-ordinates.
    const x = num % Constants.BOARD_SIZE;
    const y = Math.floor(num / Constants.BOARD_SIZE);

    return (
      <BoardSquare key={x + '-' + y} x={x} y={y} gameId={this.props.game._id}>
        {this.findTileAtCoords(x,y)}
      </BoardSquare>
    );

  },
  render() {
    let squares = [];
    let num;

    for ( num = 0; num < (Constants.BOARD_SIZE * Constants.BOARD_SIZE); num++ ) {
      squares.push( this.renderSquare(num) );
    }

    return (
      <div id="board">
        {squares}
      </div>
    );
  }
})
