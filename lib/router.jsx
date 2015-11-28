FlowRouter.route("/", {
  name: "home",
  action() {
    ReactLayout.render(MainLayout, {
      content: <Home />
    });
  }
});

FlowRouter.route("/games", {
  name: "gameList",
  action() {
    ReactLayout.render(MainLayout, {
      content: <GameList />
    });
  }
});

FlowRouter.route("/games/:gameId", {
  name: "game",
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <Game gameId={params.gameId} />
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
      content: <Profile profileId={params.profileId} />
    })
  }
});
