FlowRouter.route("/", {
  name: "home",
  action() {
    // TODO
  }
});

FlowRouter.route("/games", {
  name: "gameList",
  action() {
    // TODO
  }
});

FlowRouter.route("/games/:_id", {
  name: "game",
  action(params) {
    ReactLayout.render(MainLayout, {
      content: <Game _id={params._id} />
    });
  }
});
