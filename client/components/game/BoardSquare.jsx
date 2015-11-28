BoardSquare = React.createClass({
  render() {
    return (
      <div className="board-square">
        { this.props.children ? <Tile tile={this.props.children} /> : null }
      </div>
    );
  }
});
