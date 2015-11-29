Controls = React.createClass({
  isMyTurn() {
    return false
  },
  render() {
    return (
      <div id="controls">
        <div className="turn-indicator">{this.isMyTurn() ? 'Your Turn' : 'Their Turn'}</div>
        <div className="submit-word-container">
          <button className="button submit-word">
            Submit Word
          </button>
        </div>
        <div className="other-actions-container">
          <button><i className="fa fa-random"></i></button>
          <button><i className="fa fa-magnet"></i></button>
        </div>
      </div>
    );
  }
});
