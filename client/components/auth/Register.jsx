Register = React.createClass({
  getInitialState() {
    return {
      canSubmit: false
    }
  },
  enableButton() {
    this.setState({
      canSubmit: true
    });
  },
  disableButton() {
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

          { /* Step 1 - Auth info like email/pass, or Oauth verification */ }
          <div className="card-header">
            <h1>Registration</h1>
            <h3>The world's shortest signup form.</h3>
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
            <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
              {/* fake fields are a workaround for chrome autofill getting the wrong fields */}
              <input style={{ display: "none" }} type="text" name="fakeusernameremembered"/>
              <input style={{ display: "none" }} type="password" name="fakepasswordremembered"/>

              <FloatingTextField
              name="username"
              type="text"
              label="Choose a Username"
              validations={{
                maxLength: 30
              }}
              validationErrors={{
                maxLength: "Egad! That username is too long. Keep it under 30, please."
              }}
              required
              />

              <FloatingTextField
              name="password"
              type="password"
              label="Choose a Password"
              validations={{
                minLength: 8,
                maxLength: 50
              }}
              validationErrors={{
                minLength: "Gotta be at least 8 characters. Don't be so hackable!",
                maxLength: "Woah there, cowboy. Password length is limited to 50 characters."
              }}
              required
              />

              <button type="submit" className="button continue" disabled={!this.state.canSubmit}>
                <i className="fa fa-caret-right right"></i>
                Register
              </button>
            </Formsy.Form>
          </div>
        </div>
      </div>
    );
  }
});
