const DragSource = ReactDnD.DragSource;

Tile = React.createClass({
  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  },
  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div className="tile" style={{ opacity: isDragging ? 0 : 1 }}>
        <div className="tile-letter">{this.props.tile.letter}</div>
        <div className="tile-points">{this.props.tile.points}</div>
      </div>
    );
  }
});


const tileSource = {
  beginDrag(props) {
    return props.tile;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

Tile = DragSource('tile', tileSource, collect)(Tile);
