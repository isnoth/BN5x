import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
} from './action-types';


/*
export function createTask(title) {
  return (dispatch, getState) => {
    //const { auth, firebase } = getState();

    firebase.child(`tasks/${auth.id}`)
      .push({completed: false, title}, error => {
        if (error) {
          console.error('ERROR @ createTask :', error); // eslint-disable-line no-console
          dispatch({
            type: CREATE_TASK_ERROR,
            payload: error
          });
        }
      });
  };
}


export function deleteTask(task) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`tasks/${auth.id}/${task.key}`)
      .remove(error => {
        if (error) {
          console.error('ERROR @ deleteTask :', error); // eslint-disable-line no-console
          dispatch({
            type: DELETE_TASK_ERROR,
            payload: error
          });
        }
      });
  };
}


export function undeleteTask() {
  return (dispatch, getState) => {
    const { auth, firebase, tasks } = getState();
    const task = tasks.deleted;

    firebase.child(`tasks/${auth.id}/${task.key}`)
      .set({completed: task.completed, title: task.title}, error => {
        if (error) {
          console.error('ERROR @ undeleteTask :', error); // eslint-disable-line no-console
        }
      });
  };
}


export function updateTask(task, changes) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    firebase.child(`tasks/${auth.id}/${task.key}`)
      .update(changes, error => {
        if (error) {
          console.error('ERROR @ updateTask :', error); // eslint-disable-line no-console
          dispatch({
            type: UPDATE_TASK_ERROR,
            payload: error
          });
        }
      });
  };
}
*/


export function registerListeners() {
  return (dispatch, getState) => {
    const { /*auth,*/ firebase } = getState();
    const ref = firebase/*.child('articles');*/
    console.log(ref)
    console.log('registerListeners:')

    /*
    ref.on('child_added', snapshot => dispatch({
      type: CREATE_TASK_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));
    */

    ref.on('value', snapshot => dispatch({
      type: GET_TASK_SUCCESS,
      payload: snapshot.val()
    }));

    /*
    ref.on('child_changed', snapshot => dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));

    ref.on('child_removed', snapshot => dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: recordFromSnapshot(snapshot)
    }));
    */
  };
}

export function nodeUpdate(key, change) {
  console.log(key, change)


  return (dispatch, getState) => {
    const { /*auth,*/ firebase } = getState();
    const ref = firebase/*.child('articles');*/


    ref.child(key).update({collapsed: change.collapsed})

    /*
    
    .transaction(function(i){
      console.log(i)
      return (Object.assign({}, i, {collapsed: !i.collapsed}))
    })
    */


   /*
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: {key: key, type: "collapsed"}
    });
    */
  }
}


function recordFromSnapshot(snapshot) {
  console.log(snapshot.val())

  let record = snapshot.val();
  record.key = snapshot.key();
  return record;
}
