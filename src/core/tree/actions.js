import {Node} from "components/tree/node"

import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  CHANGE_CURRENT_FOCUS,
  CUT_NODE
} from './action-types';



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
  //console.log("tree action: ","nodeDelete")
  return (dispatch, getState) => {
    const { tree, firebase } = getState();
    var node = new Node(tree.list)
    var deleteList = node.getAllChildren(tree.currentFocus)
    //console.log('deleteList:, ', deleteList)
    const ref = firebase.tree/*.child('articles');*/

    var parent = node.getParent(tree.currentFocus)
    //console.log('before: ', parent.children)
    parent.children.splice(parent.children.indexOf(tree.currentFocus), 1)

    //console.log('after: ', parent.children)


    //udpate
    ref.child(parent.id).update({
      children: parent.children
    }, function(result){
      //delete
      deleteList.map(function(item){
        ref.child(item.id).remove()
      })
    })
  }

}


export function nodeCreate(type) {
  //console.log("tree action: ","nodeCreate")
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
    //console.log("[nodeCreate()]: ", tree.currentFocus, type)

    //create new node
    const ref = firebase.tree/*.child('articles');*/
    ref.child(newid).set(newNode, function(error){
      //console.log(error)
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
      //console.log('debug, ', parent.children, l)
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
  //console.log(key, change)

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

      case "COMMON":
        ref.child(key).update( change.value )
        break
    }
  }
}

export function nodeCut() {
  //console.log("node cut")
  return (dispatch, getState) => {
    const { tree, firebase } = getState();
    const ref = firebase.tree/*.child('articles');*/

    dispatch({
      type: CUT_NODE,
      payload: tree.currentFocus,
    });

  }

}

export function nodePaste() {
  return (dispatch, getState) => {
    const { tree, firebase } = getState();
    const ref = firebase.tree/*.child('articles');*/

    console.log("cut, focut: ", tree.cut, tree.currentFocus)

    //if null then return 
    if (!tree.cut | tree.currentFocus){
      return 
    }
    //if same then do nothing
    if (tree.cut == tree.currentFocus){
      return
    }

    var node = new Node(tree.list)
    const newparent = node.getParent(tree.currentFocus)
    console.log("node:", node._lNodes.map(function(i){return i.content + "_"+i.key}))
    //console.log("newparent:", newparent, tree.currentFocus)

    //cut
    const currentparent = node.getParent(tree.cut)
    var currentchildren = currentparent.children 
    console.log("currentchildren before:", currentchildren)
    currentchildren.splice(currentchildren.indexOf(tree.cut),1)
    console.log("currentchildren after:", currentchildren)

    //paste
    let newchildren = newparent.children 
    console.log("newchildren before:", newchildren)
    var index = newchildren.indexOf(tree.currentFocus)+1
    console.log("index: ", index)
    var _index =-( newchildren.length - index)
    console.log("_index: ", _index)
    newchildren = [...newchildren.slice(0,index), tree.cut , ...newchildren.slice(_index)]
    console.log("newchildren after:", newchildren)


    if (newparent.id != currentparent.id){
      ref.child(currentparent.id).update({
        children: currentchildren
      })
    }

    ref.child(newparent.id).update({
      children: newchildren
    })

  }

}




