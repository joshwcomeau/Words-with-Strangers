Game = React.createClass({
  mixins: [TrackerReact],
  componentWillMount() {
    Meteor.subscribe('game', this.props._id);
  },
  game() {
    console.log("Games running, and finding", Games.find({}).fetch()[0])
    return Games.find(this.props._id).fetch()[0];
  },
  render() {
    return (
      <div>
        <h4>Game time!</h4>
        <h6>{this.game().title}</h6>
      </div>
    );
  }
});
