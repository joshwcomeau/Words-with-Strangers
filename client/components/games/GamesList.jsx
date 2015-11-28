GamesList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {};

    let handle = Meteor.subscribe('games');
    if ( handle.ready() ) {
      data.games = Games.find({}, { sort: { createdAt: -1 }}).fetch();
    }

    return data;
  },

  render() {
    return (
      <div id="games-list">
        <header>
          <button>Create New</button>
          <h4>Current Games</h4>
        </header>
        { this.data.games ? <GamesListTable games={this.data.games} /> : <Loading /> }
      </div>
    );
  }
});
