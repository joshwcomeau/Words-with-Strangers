Header = React.createClass({


  render() {
    return (
      <header id="main-layout-header">
        <h2 id="main-layout-logo">Words with Strangers</h2>
        <nav>
          <a>Games</a>
          <a>Leaderboard</a>
          { this.props.currentUser ? <HeaderAccount /> : <HeaderLogIn /> }
        </nav>
      </header>
    )
  }
});
