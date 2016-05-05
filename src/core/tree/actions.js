import {Node} from "components/tree/node"

import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  CHANGE_CURRENT_FOCUS
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
    const ref = firebase.tree/*.child('articles');*/
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

export function changeFocus(key, change) {
  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_CURRENT_FOCUS,
      payload: key
    });
  }
}


export function nodeDelete(type) {
  console.log("tree action: ","nodeDelete")
  return (dispatch, getState) => {
    const { tree, firebase } = getState();
    var node = new Node(tree.list)
    var deleteList = node.getAllChildren(tree.currentFocus)
    console.log('deleteList:, ', deleteList)
    const ref = firebase.tree/*.child('articles');*/

    var parent = node.getParent(tree.currentFocus)
    console.log('before: ', parent.children)
    parent.children.splice(parent.children.indexOf(tree.currentFocus), 1)

    console.log('after: ', parent.children)


    //udpate
    ref.child(parent.id).update({
      children: parent.children
    }, function(result){
      //delete
      deleteList.map(function(item){
        ref.child(item.id).remove()
      })
    })


    

    //console.log("[nodeDelete()]: ", )
  }

}


export function nodeCreate(type) {
  console.log("tree action: ","nodeCreate")
  return (dispatch, getState) => {
    const { tree, firebase } = getState();

    var node = new Node(tree.list)
    var newid = node.getUniqueId()
    var newNode = {
      collapsed:false,
      content:"",
      fold:false,
      icon:0,
      id: newid,
    }
    console.log("[nodeCreate()]: ", tree.currentFocus, type)

    //create new node
    const ref = firebase.tree/*.child('articles');*/
    ref.child(newid).set(newNode, function(error){
      console.log(error)
    })


    //update
    if (type == "CURRENT"){
      var parent = node.getParent(tree.currentFocus)
    }else{
      var parent = node.getbyName(tree.currentFocus)
    }
    //var children = parent.children
    //var newkey = Math.max.apply(null, Object.keys(parent.children).map(function(i){return parseInt(i)}))+1
    //console.log('newkey is:', newkey)
    if (parent.children){
      //parent.children.push( newid)
      var l = parent.children.splice(parent.children.indexOf(tree.currentFocus)+1)
      console.log('debug, ', parent.children, l)
      parent.children.push(newid)
      parent.children = parent.children.concat(l)
    //  console.log(parent.children)
    }else{
      parent.children = []
      parent.children.push(newid)
    }

    ref.child(parent.id).update({
      children: parent.children
    })


    /*
    dispatch({
      type: CHANGE_CURRENT_FOCUS,
      payload: key
    });
    */
  }
}

export function nodeUpdate(key, change) {
  console.log(key, change)

  return (dispatch, getState) => {
    const { /*auth,*/ firebase } = getState();
    const ref = firebase.tree/*.child('articles');*/

    switch (change.type){
      case "VALUE":
        ref.child(key).update({content: change.value})
        break

      
      case "COLLAPSED":
        ref.child(key).update({collapsed: change.collapsed})
        break
    }

    /*
    if (Object.keys(change).indexOf("collapsed")){
      console.log("collapsed：", key, change)
      ref.child(key).update({collapsed: change.collapsed})
    }else if  (Object.keys(change).indexOf("value")){
      console.log(key, change.value)
      ref.child(key).update({content: change.value})
    }
    */


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



