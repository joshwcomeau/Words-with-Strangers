TileRack = React.createClass({
  renderTiles() {
    return this.props.tiles.map( (tile) => {
      return (<div className="tile" key={tile._id}>{tile.letter}</div>);
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
