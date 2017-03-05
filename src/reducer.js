import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { authReducer } from 'core/auth';
import { firebaseReducer } from './core/firebase';
import { pomodarioReducer } from './core/pomodario';
import { uiReducer } from './core/ui'

import { mdReducer } from './core/md'
import { flatReducer } from './core/flat'

export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  uiState: uiReducer,
  routing: routerReducer,
  pomodario: pomodarioReducer,
  md: mdReducer,
  flat: flatReducer,
});
