Header = React.createClass({


  render() {
    return (
      <header id="main-layout-header">
        <h2 id="main-layout-logo">Words with Strangers</h2>
        <nav>
          { this.props.currentUser ? <HeaderAccount currentUser={this.props.currentUser} /> : <HeaderLogIn /> }
          <a className="nav-link">Leaderboard</a>
          <a className="nav-link">Games</a>


        </nav>
      </header>
    )
  }
});
