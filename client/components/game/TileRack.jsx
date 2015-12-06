DropTarget = ReactDnD.DropTarget;

TileRack = React.createClass({
  getInitialState() {
    return {
      tiles: this.props.tiles
    }
  },
  componentWillReceiveProps(newProps) {
    // This is called when the Tiles subscription updates.
    // Normally we'd just let it do its business, but it's possible that
    // this could overwrite the locally-stored business of sorting.
    // When we shuffle the rack, we re-arrange the tiles. When Meteor sends
    // an updated set of tiles, we don't want to lose that ordering!

    let currentTiles  = this.state.tiles;
    let meteorTiles   = newProps.tiles;

    // We now have two arrays: One with the 'current' tiles, from state,
    // and one with the new tiles, updated from Meteor. We want to keep
    // the NEW tiles, but ordered in the order from the OLD ones, with
    // any tile(s) only found in the new tiles pushed to the end.
    // For example: [ B, D, C, A ] & [ A, C, E ] => [ C, A, E ]
    // B and D were removed, and E was added. A and C were re-ordered, and
    // E was appended.
    let newTiles = [];

    // Create a clone of meteorTiles, that we can use to "cross out" tiles
    // as we find them
    let newMeteorTiles = meteorTiles.slice();

    // Iterate through currentTiles, since they hold the desired order.
    currentTiles.forEach( (tile) => {

      // Find its clone in meteorTiles
      meteorTile = _.find(meteorTiles, { _id: tile._id})

      if ( meteorTile ) {
        // If we've found it, push it to the new array
        newTiles.push(meteorTile);
        // Also, remove it from seenMeteorTiles. This way, that array will
        // only contain the brand new tiles, not found in currentTiles.
        _.remove(newMeteorTiles, { _id: tile._id });
      }
    });

    // Only thing left to do is add the brand new tiles from newMeteorTiles
    // to our array!
    this.setState({
      tiles: _.union(newTiles, newMeteorTiles)
    });
  },
  shuffle() {
    console.log("SHuffle clicked")
    this.setState({tiles: _.shuffle(this.state.tiles)});
  },
  renderTiles() {
    return this.state.tiles.map( (tile) => {
      return <Tile tile={tile} key={tile._id} />;
    });
  },
  render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div id="tile-rack">
        { this.renderTiles() }
        { isOver ? <div className='square-overlay'></div> : null }
        <div onClick={this.shuffle}>FUCK</div>
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
