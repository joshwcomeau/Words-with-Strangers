HeaderLogIn = React.createClass({
  render() {
    return (
      <span className="nav-link header-log-in">
        <div className="log-in-text">
          Sign In
        </div>
        <div className="dropdown-menu-blocker log-in-menu-blocker"></div>
        <div className="dropdown-menu log-in-menu right-arrow">
          <form className="log-in-form">
            <input type="text" name="email_username" placeholder="Email or Username" />
            <input type="password" name="password" placeholder="Password" />
            <button className="button tori-login">Sign In</button>
          </form>
          <div className="divider" data-text="or"></div>
          <div className="oauth-buttons">
            <button className="button twitter">
              <i className="fa fa-twitter"></i>
              Sign In With Twitter
            </button>
            <button className="button google">
              <i className="fa fa-google-plus"></i>
              Sign In With Google
            </button>
          </div>
          <div className="divider" data-text="Don't have an account?"></div>
          <a href="/register" className="register-link">Register now</a>
        </div>
      </span>
    );
  }
});
