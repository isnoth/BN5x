import Firebase from 'firebase';
var Wilddog = require("wilddog");
import React from 'react';
import { render } from 'react-dom';
import { Root } from './components/root';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { FIREBASE_URL } from './config';
import { POMODARIO_FIREBASE_URL } from './config';
import configureStore from './store';

// disable warnning from editor see https://github.com/facebook/draft-js/issues/53                                                                                                              
console.error = (function() {
  var error = console.error
  return function(exception) {
    if ((exception + '').indexOf('Warning: A component is `contentEditable`') != 0) {                                                                                                           
        error.apply(console, arguments)
    }
  }
})()

const store = configureStore({
  firebase: {
    tree: new Wilddog(FIREBASE_URL)
  }
});


const history = syncHistoryWithStore(browserHistory, store);

render(<Root history={history} store={store}/>, document.getElementById('app'));
