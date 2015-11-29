const DragSource = ReactDnD.DragSource;

Tile = React.createClass({
  propTypes: {
    connectDragSource: React.PropTypes.func.isRequired,
    isDragging: React.PropTypes.bool.isRequired
  },
  render() {
    const { connectDragSource, isDragging } = this.props;

    return connectDragSource(
      <div className="tile" style={{
        opacity: isDragging ? 0.5 : 1
      }}>{this.props.tile.letter}</div>
    );
  }
});


const tileSource = {
  beginDrag(props) {
    console.log("Drag begun")
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

Tile = DragSource('tile', tileSource, collect)(Tile);
