import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
//import { authReducer } from 'core/auth';
import { firebaseReducer } from './core/firebase';
import { treeReducer } from './core/tree';
//import { pomodarioReducer } from './core/pomodario';
import { articleReducer } from './core/article';
//import { notificationReducer } from 'core/notification';
//import { tasksReducer } from 'core/tasks';


export default combineReducers({
  //auth: authReducer,
  firebase: firebaseReducer,
  //notification: notificationReducer,
  routing: routerReducer,
  tree: treeReducer,
  //pomodario: pomodarioReducer,
  articles: articleReducer,
  //tasks: tasksReducer
});
