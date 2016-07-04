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

var store

if (process.env.NODE_ENV !== 'production') {
  store = configureStore({
    firebase: {
      tree: new Wilddog('https://bn5.wilddogio.com/notes/users/simplelogin:f03ad24b-e53c-4a0b-aceb-ee09655742c8/files/BN-1467360362714-UkqoP/nodes/')
    }
  });
}else{
  store = configureStore({
    firebase: {
      tree: Firebase.initializeApp({ databaseURL: FIREBASE_URL,
                                     apiKey: "AIzaSyC0EMSYTI4wQWQGjM93LT3nO5mGvzo-8eo",
                                     authDomain: "project-4888672709010520163.firebaseapp.com",
                                   }).database().ref().child('/notes/users/simplelogin:f03ad24b-e53c-4a0b-aceb-ee09655742c8/files/') ,
  
      //pomodario: new Firebase(POMODARIO_FIREBASE_URL)
    }
  });

}


const history = syncHistoryWithStore(browserHistory, store);

render(<Root history={history} store={store}/>, document.getElementById('app'));
