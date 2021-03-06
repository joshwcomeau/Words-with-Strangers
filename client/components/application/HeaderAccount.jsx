HeaderAccount = React.createClass({
  getInitialState() {
    return {
      menuOpen: false
    }
  },
  toggleMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  },
  profileLink() {
    return FlowRouter.path('profile', { profileId: this.props.currentUser._id });
  },
  logout() {
    Meteor.logout( (err) => {
      if (err) console.error( "Error logging out:", err );
      this.setState({ menuOpen: false });
    });
  },
  render() {
    return (
      <span className="nav-link header-account">
        <button className="account-thumb" onClick={this.toggleMenu} style={{
          backgroundImage: `url('${this.props.currentUser.profile.photo}')`
        }}></button>
      <div className={this.state.menuOpen ? '' : 'hide'}>
        <div className="dropdown-menu-blocker account-menu-blocker" onClick={this.toggleMenu}></div>
          <div className="dropdown-menu account-menu right-arrow">
            <a href={this.profileLink()} className="profile-link">
              <strong>{this.props.currentUser.username}</strong><br />
              <span>View My Profile</span>
            </a>
            <a className="log-out-link" onClick={this.logout}>Log Out</a>
          </div>
        </div>

      </span>
    );
  }
});
