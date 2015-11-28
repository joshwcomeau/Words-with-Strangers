FlowRouter.route("/", {
  name: "home",
  action() {
    ReactLayout.render(MainLayout, {
      content: <Home />
    });
  }
});

FlowRouter.route("/games", {
  name: "gamesList",
  action() {
    ReactLayout.render(MainLayout, {
      content: <GamesList />
    });
  }
});

FlowRouter.route("/games/:gameId", {
  name: "game",
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <Game {...params} />
    });
  }
});

FlowRouter.route("/register", {
  name: "register",
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <Register />
    });
  }
});

FlowRouter.route("/profile/:profileId", {
  name: "profile",
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <Profile {...params} />
    })
  }
});
