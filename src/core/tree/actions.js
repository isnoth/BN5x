import {Node, Panls} from "utils/node"
import {getVal, toList, paste, create, createNeighbourNode, createChildNode} from "utils/firebaseUtil"

import {
  CREATE_TASK_ERROR,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
  GET_TASK_SUCCESS,
  CHANGE_CURRENT_FOCUS,
  CUT_NODE,
  START_LISTENING,
  UPDATE_LAYOUT_SUCCESS,
} from './action-types';

export function stopRegisterListeners(key, ref) {
  return (dispatch, getState) => {
    console.log('listern off: ',key )
    ref.off()
  }
}


export function updateLayout(value){

  return (dispatch, getState) => {
    const lists = Object.keys(value).map(
      function(key){
        return Object.assign(
          {}, 
          value[key],
          {key: key}
        )
      }
    )

    const panls = new Panls(lists)
    let layout1 = panls.getLayout()
    dispatch({
      type: UPDATE_LAYOUT_SUCCESS,
      payload: layout1
    })
  }

}

export function startRegisterListeners(fileId) {
  return (dispatch, getState) => {
    const { files2, auth, firebase } = getState();
    console.log(auth.userRef)
    let childRef = auth.userRef+"/files/"+fileId+'/nodes/'

    console.log(childRef)

    let ref = firebase.tree.child(childRef)


    if(files2.ref){
      const oldRef = files2.ref
      const oldKey = files2.key
      dispatch(stopRegisterListeners(oldKey, oldRef))
    }

    dispatch({
      type: START_LISTENING,
      payload:{key: fileId, ref: ref}
    })

    console.log("listen on :",fileId )
    ref.on('value', (snapshot) => {
      dispatch({
        type: GET_TASK_SUCCESS,
        payload: {id: fileId, value: snapshot.val()}
      })


    });

    ref.once('value', (snapshot) => {
      dispatch(updateLayout(snapshot.val()))
    })

  };
}




export function changeFocus(key, change) {
  return (dispatch, getState) => {
    console.log('changeFocus:', key)
    dispatch({
      type: CHANGE_CURRENT_FOCUS,
      payload: key
    });
  }
}


export function nodeDelete(type) {
  //console.log("tree action: ","nodeDelete")
  return (dispatch, getState) => {
    const { files2, firebase } = getState();
    let list = files2[files2.key].list
    let node = new Node(list)
    var deleteList = node.getAllChildren(files2.currentFocus)
    const ref = files2.ref

    let parent = node.getParent(files2.currentFocus)
    //console.log('before: ', parent.children)
    parent.children.splice(parent.children.indexOf(files2.currentFocus), 1)

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


export function nodeCreateNeighbour(type) {
  //console.log("tree action: ","nodeCreate")
  return (dispatch, getState) => {
    const { files2, firebase } = getState();
    let list = files2[files2.key].list

    const ref = files2.ref
    let node = new Node(files2[files2.key].list)

    var newid = node.getUniqueId()
    var newNode = {
      collapsed:false,
      content:"",
      fold:false,
      icon:0,
      id: newid,
    }
    console.log('nodeCreateNeighbour:', files2.currentFocus, list, ref, newNode)
    createNeighbourNode(files2.currentFocus, list, ref, newNode )

    /*
    dispatch({
      type: CHANGE_CURRENT_FOCUS,
      payload: key
    });
    */
  }
}

export function nodeCreateChild() {
  //console.log("tree action: ","nodeCreate")
  return (dispatch, getState) => {
    const { files2, firebase } = getState();
    const ref = files2.ref
    let list = files2[files2.key].list

    var node = new Node(list)

    var newid = node.getUniqueId()
    var newNode = {
      collapsed:false,
      content:"",
      fold:false,
      icon:0,
      id: newid,
    }
    createChildNode(files2.currentFocus, list, ref, newNode )
  }
}


export function nodeUpdate(key, change) {
  //console.log(key, change)

  return (dispatch, getState) => {
    const { files2} = getState();
    const ref = files2.ref

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

      //case "COMMON":
      //  const args = {ref: ref, key: key, value: change.value}
      //  const queue = files2.queue
      //  queue.push(args, function (){
      //    console.log("update pushed to server")
      //  })
      //  break

    }
  }
}

export function nodeCut() {
  //console.log("node cut")
  return (dispatch, getState) => {
    const { files2, firebase } = getState();
    const ref = files2.ref

    dispatch({
      type: CUT_NODE,
      payload: files2.currentFocus,
    });

  }

}

export function nodePaste() {
  return (dispatch, getState) => {
    const { files2 } = getState();
    const ref = files2.ref
    let list = files2[files2.key].list

    return paste(files2.cut, files2.currentFocus, list, ref)
    .then(function(result){

      dispatch({
        type: CHANGE_CURRENT_FOCUS,
        payload: files2.currentFocus,
      });

    })

  }
}

export function createPanel() {
  //console.log("tree action: ","nodeCreate")
  return (dispatch, getState) => {
    const { files2 } = getState();
    const ref = files2.ref
    let list = files2[files2.key].list
    let node = new Node(list)

    var newid = node.getUniqueId()
    var newNode = {
      collapsed: false,
      content: "",
      fold: false,
      height: 247,
      icon: 0,
      id: newid,
      width: 400,
      x: 30,
      y: 30
    }
    createChildNode("root", list, ref, newNode )
  }
}
