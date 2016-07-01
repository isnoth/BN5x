import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import createLogger from 'redux-logger';

export default (initialState = {}) => {
  let finalCreateStore;


  if (process.env.NODE_ENV !== 'production') {
    // configure redux-devtools-extension
    // @see https://github.com/zalmoxisus/redux-devtools-extension
    const logger = createLogger();

    finalCreateStore = compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    )(createStore);
  }
  else {
    finalCreateStore = applyMiddleware(thunk)(createStore);
  }


  const store = finalCreateStore(reducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      store.replaceReducer(require('./reducer').default);
    });
  }

  return store;
};
