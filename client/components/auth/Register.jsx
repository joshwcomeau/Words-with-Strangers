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
  submit(model, reset, invalidate) {
    Accounts.createUser(model, (err, result) => {
      if ( err) {
        switch (err.reason) {
          case 'Username already exists.':
            return invalidate({
              username: 'Sorry, someone else has already taken that username. What a jerk.'
            })
            break;
          case 'reserved-username':
            return invalidate({
              username: 'Sorry, that username is a reserved word =('
            })
            break;
          default:
            return alert("Sorry, an unknown error has occured.")
        }
      }

      // We've logged in! Redirect to the games list
      FlowRouter.go('gamesList');
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
                isAlphanumeric: true,
                maxLength: 30
              }}
              validationErrors={{
                isAlphanumeric: "Our deepest apologies, but usernames can only contain letters and numbers.",
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
