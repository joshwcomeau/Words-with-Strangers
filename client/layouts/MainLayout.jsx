MainLayout = React.createClass({
  render() {
    return (
      <div>
        <header>
          <h1>Words with Strangers</h1>
        </header>

        {this.props.content}

      </div>
    );
  }
});
