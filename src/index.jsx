import Firebase from 'firebase';
import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { FIREBASE_URL } from './config';

const store = configureStore({
  firebase: new Firebase(FIREBASE_URL)
});

render(<App />, document.getElementById('app'));
