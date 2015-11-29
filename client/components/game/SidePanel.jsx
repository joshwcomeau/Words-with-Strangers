SidePanel = React.createClass({
  render() {
    return (
      <div id="side-panel">
        <h4 className="side-panel-title">{this.props.game.title}</h4>
      </div>
    );
  }
})
