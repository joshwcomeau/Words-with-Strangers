let { createStore, combineReducers, applyMiddleware } = Redux;

// applyMiddleware takes createStore() and returns a new wrapped createStore
// note, this is an optional step to use middleware (we're auto console.log dispatches)
let createStoreWithMiddleware = applyMiddleware(logger)(createStore);

store = createStoreWithMiddleware(appReducer);

// add our own helper for reactive-dicts, you could
// also just call getState
store.getReactiveState = function(key) {
  return store.getState().get(key);
};
