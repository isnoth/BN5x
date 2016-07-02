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

const store = configureStore({
  firebase: {
    /*
    tree: Firebase.initializeApp({ databaseURL: FIREBASE_URL,
                                   apiKey: "AIzaSyBpqDuBzbgxI6-TzgVf8Dq2yHIjB2Caxao",
                                   authDomain: "burning-torch-9051.firebaseapp.com",
                                 }).database().ref().child('/notes/users/simplelogin:f03ad24b-e53c-4a0b-aceb-ee09655742c8/files/BN-1467360362714-UkqoP/nodes/') ,
                                 */
    tree: new Wilddog('https://bn5.wilddogio.com/notes/users/simplelogin:f03ad24b-e53c-4a0b-aceb-ee09655742c8/files/BN-1467360362714-UkqoP/nodes/')

    //pomodario: new Firebase(POMODARIO_FIREBASE_URL)
  }
});

const history = syncHistoryWithStore(browserHistory, store);

render(<Root history={history} store={store}/>, document.getElementById('app'));
