Header = React.createClass({


  render() {
    return (
      <header id="main-layout-header">
        <h2 id="main-layout-logo">Words with Strangers</h2>
        <nav>
          <a className="nav-link">Games</a>
          <a className="nav-link">Leaderboard</a>
          { this.props.currentUser ? <HeaderAccount /> : <HeaderLogIn /> }
        </nav>
      </header>
    )
  }
});
