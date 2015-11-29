TileRack = React.createClass({
  renderTiles() {
    return this.props.tiles.map( (tile) => {
      return <Tile tile={tile} key={tile._id} />;
    });
  },
  render() {
    return (
      <div id="tile-rack">
        { this.renderTiles() }
      </div>
    );
  }
});
