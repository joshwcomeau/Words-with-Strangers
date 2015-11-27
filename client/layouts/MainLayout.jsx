MainLayout = React.createClass({
  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user()
    };
  },

  render() {
    return (
      <div>
        <Header currentUser={this.data.currentUser} />

        {this.props.content}

      </div>
    );
  }
});
