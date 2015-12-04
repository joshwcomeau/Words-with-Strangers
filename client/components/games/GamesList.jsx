GamesList = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    let data = {};

    let handle = Meteor.subscribe('games');
    if ( handle.ready() ) {
      data.games = Games.find({}, { sort: { createdAt: -1 }}).fetch();
    }

    data.user = Meteor.user();

    return data;
  },

  isLoggedIn() {
    console.log( !!Meteor.userId(), Meteor.user() )
    return !!Meteor.userId();
  },

  render() {
    return (
      <div id="games-list" className="center-section">
        <GamesListHeader isLoggedIn={this.isLoggedIn()} />
        <div className="card">
          { this.data.games ? <GamesListTable games={this.data.games} /> : <Loading /> }
        </div>
      </div>
    );
  }
});
