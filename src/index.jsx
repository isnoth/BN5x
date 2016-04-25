import Firebase from 'firebase';
import React from 'react';
import { render } from 'react-dom';
import { Root } from './components/root';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { FIREBASE_URL } from './config';
import { POMODARIO_FIREBASE_URL } from './config';
import configureStore from './store';

const store = configureStore({
  firebase: {
    tree:  new Firebase(FIREBASE_URL),
    pomodario: new Firebase(POMODARIO_FIREBASE_URL)
  }
});

const history = syncHistoryWithStore(browserHistory, store);

render(<Root history={history} store={store}/>, document.getElementById('app'));
