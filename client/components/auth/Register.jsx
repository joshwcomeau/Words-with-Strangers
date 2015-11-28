Register = React.createClass({
  getInitialState() {
    return {
      canSubmit: false
    }
  },
  enableSubmit() {
    this.setState({
      canSubmit: true
    });
  },
  disableSubmit() {
    this.setState({
      canSubmit: false
    });
  },
  submit(model) {
    Accounts.createUser(model, function(err, response) {
      if ( !err ) return;

      // switch (err.reason) {
      //   case 'Username already exists.':
      //     instance.errors.set('username', 'Sorry, someone else has already taken that username. What a jerk.');
      //     break;
      //   case 'Email already exists.':
      //     instance.errors.set('email', 'This email has already been used to register for an account! Are you trying to log in?');
      //     break;
      //   case 'reserved-username':
      //     instance.errors.set('username', err.details);
      //     break;
      // }
    });
  },
  render() {
    return (
      <div id="register">
        <div className="card">
          <form id="register-form-step1">
            {/* fake fields are a workaround for chrome autofill getting the wrong fields */}
            <input style={{ display: "none" }} type="text" name="fakeusernameremembered"/>
            <input style={{ display: "none" }} type="password" name="fakepasswordremembered"/>

            { /* Step 1 - Auth info like email/pass, or Oauth verification */ }
            <div className="card-header">
              <h1>Welcome to Tori!</h1>
              <h2>Registration is simple.</h2>
              <h3>Use the form below.</h3>
            </div>
            <div className="card-body">
              <button className="button twitter">
                <i className="fa fa-twitter"></i>
                Sign Up With Twitter
              </button>
              <button className="button google">
                <i className="fa fa-google-plus"></i>
                Sign Up With Google
              </button>

              <div className="divider" data-text="Or"></div>

              <div className="floating-input">
                <input type="text"
                name="username"
                id="username"
                className="user-field username"
                autoComplete="false"
                />
              <label htmlFor="username">Username</label>
                <span className="error-message"></span>
              </div>

              <div className="floating-input">
                <input type="text"
                name="email"
                id="email"
                className="user-field email"
                autoComplete="false"
                />
              <label htmlFor="email">Email Address</label>
                <span className="error-message"></span>
              </div>

              <div className="floating-input">
                <input type="password"
                name="password"
                id="password"
                className="user-field password"
                autoComplete="false"
                />
              <label htmlFor="password">Password</label>
                <span className="error-message"></span>
              </div>

              <button className="button continue">
                <i className="fa fa-caret-right right"></i>
                Continue
              </button>

            </div>
          </form>

        </div>
      </div>
    );
  }
});
