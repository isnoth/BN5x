import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

export default (initialState = {}) => {
  let finalCreateStore;


  /*
  if (process.env.NODE_ENV !== 'production') {
    // configure redux-devtools-extension
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    finalCreateStore = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )(createStore);
  }
  else {
    finalCreateStore = applyMiddleware(thunk)(createStore);
  }
  */

  finalCreateStore = applyMiddleware(thunk)(createStore);

  const store = finalCreateStore(reducer, initialState);

  /*
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default);
    });
  }
  */

  return store;
};
