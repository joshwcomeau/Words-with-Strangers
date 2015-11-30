DropTarget = ReactDnD.DropTarget;

TileRack = React.createClass({
  renderTiles() {
    return this.props.tiles.map( (tile) => {
      return <Tile tile={tile} key={tile._id} />;
    });
  },
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div id="tile-rack">
        { this.renderTiles() }
        { isOver ? <div className='square-overlay'></div> : null }
      </div>
    );
  }
});

const rackTarget = {
  drop(props, monitor) {
    const tile = monitor.getItem();
    Meteor.call('returnTiles', [tile]);
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

TileRack = DropTarget('tile', rackTarget, collect)(TileRack);
