Controls = React.createClass({
  isMyTurn() {
    return Modules.gameLogic.isMyTurn( this.props.game._id );
  },

  submitWord() {
    Modules.gameLogic.submitWord(this.props.game._id);
  },

  render() {
    return (
      <div id="controls" className={this.isMyTurn() ? 'my-turn' : 'their-turn'}>
        <div className="turn-indicator">{this.isMyTurn() ? 'Your Turn' : 'Their Turn'}</div>
        <div className="submit-word-container">
          <button
          className="button submit-word"
          disabled={!this.isMyTurn()}
          onClick={this.submitWord}
          >
            Submit Word
          </button>
        </div>
        <div className="other-actions-container">
          <button disabled={!this.isMyTurn()}>
            <i className="fa fa-random"></i>
          </button>
          <button disabled={!this.isMyTurn()}>
            <i className="fa fa-undo"></i>
          </button>
        </div>
      </div>
    );
  }
});
