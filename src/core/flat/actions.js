import {
  START_LISTERNING_TO_FLAT,
  DISABLE_DRAGABLE_FLAT,
  ENABLE_DRAGABLE_FLAT,
  NODE_CUT
} from './action-types';

import { getUniqueId } from "utils/node"
import { pasteNode } from "utils/firebase"



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
    pasteNode(rootRef, flat.content, flat.cut, key )
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
  return (dispatch, getState) => {
    const { flat, firebase } = getState();
    flat.ref.child(payload.key).update(payload)
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

    const newlayout = payload.map(i=>(
      {
      i:i.i,
      x:i.x,
      y:i.y,
      w:i.w,
      h:i.h, }
    ))
    flat.ref.child(key).update({layout: newlayout})
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


export function startListening(key){
  console.log('startListening:', key)
  return (dispatch, getstate) => {
    const { auth, firebase } = getstate();

    console.log('user ref is :', auth.userRef)
    let rootref = firebase.tree.child(auth.userRef+"/flats/"+key)

    //console.log(rootref)
    rootref.on("value", (snap)=>{
      console.log('get value!')
      let content = snap.val()


      //calculate length
      let l = 0;
      Object.keys(content).forEach(i=>{
        let node = content[i]
        if (node.children){
          let lc = node.children.length
          l = l+lc
          if(node.layout){
            l = l+lc*5
          }
        }
        l = l+3 //content & key & current
      })



      dispatch({
        type: START_LISTERNING_TO_FLAT,
        payload: {
          key: key,
          ref: rootref, 
          content: content,
          l: l,
        }
      })
    })
  }
}


