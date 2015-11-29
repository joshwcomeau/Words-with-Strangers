DropTarget = ReactDnD.DropTarget;

BoardSquare = React.createClass({
  propTypes: {
    x:      React.PropTypes.number.isRequired,
    y:      React.PropTypes.number.isRequired,
    isOver: React.PropTypes.bool.isRequired
  },
  render() {
    const { connectDropTarget, isOver } = this.props;

    return connectDropTarget(
      <div className="board-square" onClick={this.dropTile}>
        { this.props.children ? <Tile tile={this.props.children} /> : null }
        { isOver ? <div className='square-overlay'></div> : null }
      </div>
    );
  }
});

const squareTarget = {
  drop(props, monitor) {
    const tile = monitor.getItem();
    Modules.gameLogic.dropTile(tile, props);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

BoardSquare = DropTarget('tile', squareTarget, collect)(BoardSquare);
