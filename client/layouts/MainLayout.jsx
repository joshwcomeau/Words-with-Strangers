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
        <div id="main-layout-header-spacer"></div>

        {this.props.content}

      </div>
    );
  }
});
