HeaderAccount = React.createClass({
  profileLink() {
    return 'www.google.com'
  },
  render() {
    return (
      <span className="nav-link header-account">
        <button className="account-thumb" style={{
            backgroundImage: `url('${this.props.currentUser.profile.photo}')`
        }}></button>

      <div className="dropdown-menu-blocker account-menu-blocker"></div>
        <div className="dropdown-menu account-menu right-arrow">
          <a href={this.profileLink()} className="profile-link">
            <strong>{this.props.currentUser.username}</strong><br />
            <span>View My Profile</span>
          </a>
          <a href="#" className="log-out-link">Log Out</a>
        </div>

      </span>
    );
  }
});
