import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
//import { authReducer } from 'core/auth';
import { firebaseReducer } from './core/firebase';
import { treeReducer } from './core/tree';
//import { notificationReducer } from 'core/notification';
//import { tasksReducer } from 'core/tasks';


export default combineReducers({
  //auth: authReducer,
  firebase: firebaseReducer,
  //notification: notificationReducer,
  routing: routerReducer,
  tree: treeReducer,
  //tasks: tasksReducer
});
