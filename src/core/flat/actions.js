import {
  RECEIVE_NODES_CONTENT,
  RECEIVE_NODES_FINISHED,
  UPDATE_REF,

  UPDATE_NODE,
  CREATE_NODE,
  DELETE_NODE,


  START_LISTERNING_TO_FLAT,
  DISABLE_DRAGABLE_FLAT,
  ENABLE_DRAGABLE_FLAT,
  NODE_CUT
} from './action-types';

import { getUniqueId } from "utils/node"
import { pasteNode } from "utils/firebase"
import { getParent, nodeGetAllChildrenId} from "utils/node2"



export function nodeCut(key){
  return (dispatch, getState) => {
    dispatch({
      type: NODE_CUT,
      payload: key,
    })
  }
}

export function nodePaste(key){
  return (dispatch, getState) => {
    const { flat, firebase , auth} = getState();
    let rootRef = firebase.tree.child(auth.userRef+"/flats/")

    let ref = rootRef
    let obj = flat.content
    let cid = flat.cut
    let nid = key

    let cNode = obj[cid]
    let nParent = getParent( nid, obj)
    let cParent = getParent( cid, obj)

    if (cParent==nParent && 
        (obj[nParent].children.indexOf(nid)-obj[nParent].children.indexOf(cid) == -1)){
      console.log("1.2 -> 1.1")
    }else if(nodeGetAllChildrenId(cid, obj).indexOf(nid) > -1){
      console.log('1.1 -> 1')
    }else{
      //cut
      let currentchildren = obj[cParent].children 
      currentchildren.splice(currentchildren.indexOf(cid),1) //!!!!

      //paste
      let newchildren = obj[nParent].children 
      let index = newchildren.indexOf(nid)+1
      let _index =-( newchildren.length - index)

      if ((index == newchildren.length) || (newchildren.length == 1)){
        newchildren = [...newchildren, cid]
      }else{
        newchildren = [...newchildren.slice(0,index), cid, ...newchildren.slice(_index)]
      }

      if (nParent != cParent){
        dispatch(nodeUpdate(Object.assign({}, obj[cParent], {children: currentchildren})))
      }
  
      dispatch(nodeUpdate(Object.assign({}, obj[nParent], {children: newchildren})))

    }

  }
}


export function disableDragableFlat(){
  return (dispatch, getState) => {
    dispatch({
      type: DISABLE_DRAGABLE_FLAT,
    })
  }
}

export function enableDragableFlat(){
  return (dispatch, getState) => {
    dispatch({
      type: ENABLE_DRAGABLE_FLAT,
    })
  }
}

export function createRoot(){
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    let rootRef = firebase.tree.child(auth.userRef+"/flats/")

    const newNode = {
      key: "root"
    }

    rootRef.child("root").set(newNode, (err)=>{
      if (err){
        console.log("createRoot failed!", err)
      }else{
        console.log("createRoot success")
      }
    })
  }
}


export function nodeUpdate(payload) {
  console.log("nodeUpdate", payload)
  return (dispatch, getState) => {
    const { flat, firebase } = getState();
    flat.ref.child(payload.key).update(payload)

    dispatch({
      type: UPDATE_NODE,
      payload: {[payload.key]:payload}
    })
  }
}

export function nodeCreate(payload) {

  console.log("nodeCreate", payload)
  return (dispatch, getState) => {
    const { flat, firebase } = getState();

    //add rollback
    flat.ref.child(payload.key).set(payload, (err)=>{
      console.log(err)
    })

    dispatch({
      type: CREATE_NODE,
      payload: {[payload.key]:payload}
    })

  }
}

export function nodeDelete(payload){
  return (dispatch, getState) => {
    const { flat, firebase } = getState();

    const cNodeKey = payload
    const obj = flat.content

    let parentKey = getParent(cNodeKey, obj)
    let parent = obj[parentKey]
    let deleteList = nodeGetAllChildrenId(cNodeKey, obj)
    deleteList.push(cNodeKey)
    let children = obj[parentKey].children
    children.splice(children.indexOf(cNodeKey), 1)
    parent.children = children

    dispatch(nodeUpdate(parent))

    deleteList.forEach(i=>{
      flat.ref.child(i).remove()
      dispatch({
        type: DELETE_NODE,
        payload: {key: i}
      })
    })
  }
}
//node with markdown
export function nodeUpdateMd(payload) {
  return (dispatch, getState) => {
    const { flat, firebase, md} = getState();
    let fnd = md.articles.filter(i=>{
      return i.header == payload.md
    })
    payload.md = fnd[0]?fnd[0].key:null
    flat.ref.child(payload.key).update(payload)
  }
}


export function nodeUpdateLayout(key, payload) {
  return (dispatch, getState) => {
    const { flat, firebase } = getState();

    const newlayout = payload.layout.map(i=>(
      {
      i:i.i,
      x:i.x,
      y:i.y,
      w:i.w,
      h:i.h, }
    ))
    payload.layout = newlayout
    dispatch(nodeUpdate(payload))
  }
}

export function nodeCreateChild(key) {
  return (dispatch, getState) => {
    const { flat, firebase } = getState();
    let list = flat.list

    const newNode = {
      key: getUniqueId()
    }
    createChildNode(key, list, flat.ref, newNode )
  }
}



//get all nodes and listening to delete/update/add
export function startListening(){
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    let rootRef = firebase.tree.child(auth.userRef+"/flats/")
    dispatch({
      type: UPDATE_REF,
      payload: rootRef,
    })

    function get(ref, key, limit ){
      console.log("get!")
      console.log(ref)
       if (key){
         ref.orderByKey().startAt(key).limitToFirst(limit).once("value",function(snapshot){
             let val = snapshot.val()
             console.log(val)
             dispatch({
               type: RECEIVE_NODES_CONTENT,
               payload: val,
             })
             let keys = Object.keys(val).sort()
             //keys.forEach(i=>console.log(i))
             if (keys.length==limit){
               get(ref, keys[limit-1], limit)
             }else{
               dispatch({
                 type: RECEIVE_NODES_FINISHED,
               })
             }
         })
       }else{
         ref.orderByKey().limitToFirst(limit).once("value",function(snapshot){
             let val = snapshot.val()
             console.log(val)
             dispatch({
               type: RECEIVE_NODES_CONTENT,
               payload: val,
             })
    
             let keys = Object.keys(val).sort()
             //keys.forEach(i=>console.log(i))
             if (keys.length==limit){
               get(ref, keys[limit-1], limit)
             }else{
               dispatch({
                 type: RECEIVE_NODES_FINISHED,
               })
             }
         })
       }
    }

    //get till last
    get(rootRef, null, 100)

  }
}


