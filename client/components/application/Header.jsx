Header = React.createClass({

  homeUrl() {
    return FlowRouter.path('home');
  },
  render() {
    return (
      <header id="main-layout-header">
        <a href={this.homeUrl()} id="main-layout-logo">Words with Strangers</a>
        <nav>
          { this.props.currentUser ? <HeaderAccount currentUser={this.props.currentUser} /> : <HeaderLogIn /> }
          <a className="nav-link">Leaderboard</a>
          <a className="nav-link" href={FlowRouter.path('gamesList')}>Games</a>


        </nav>
      </header>
    )
  }
});
