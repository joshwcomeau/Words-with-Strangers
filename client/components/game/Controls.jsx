Controls = React.createClass({
  isMyTurn() {
    return this.props.game.playerTurn === Meteor.userId();
  },

  render() {
    return (
      <div id="controls" className={this.isMyTurn() ? 'my-turn' : 'their-turn'}>
        <div className="turn-indicator">{this.isMyTurn() ? 'Your Turn' : 'Their Turn'}</div>
        <div className="submit-word-container">
          <button
          className="button submit-word"
          disabled={!this.isMyTurn()}
          onClick={Modules.gameLogic.submitWord}
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
