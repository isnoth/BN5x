import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import { authReducer } from 'core/auth';
import { firebaseReducer } from './core/firebase';
//import { treeReducer } from './core/tree';
import { files2Reducer } from './core/tree'
import { tree2Reducer } from './core/tree2';
import { pomodarioReducer } from './core/pomodario';
import { articleReducer } from './core/article';
import { uiReducer } from './core/ui'
import { filesReducer } from './core/files'

import { mdReducer } from './core/md'
import { flatsReducer } from './core/flat'

//import { notificationReducer } from 'core/notification';
//import { tasksReducer } from 'core/tasks';

export default combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  uiState: uiReducer,
  //notification: notificationReducer,
  routing: routerReducer,
  //tree: treeReducer,
  files2: files2Reducer,
  pomodario: pomodarioReducer,
  articles: articleReducer,
  tree2: tree2Reducer,
  files: filesReducer,
  md: mdReducer,
  flat: flatsReducer,
  //tasks: tasksReducer
});
