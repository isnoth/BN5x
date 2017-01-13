import {
  START_LISTERNING_TO_FLAT

} from './action-types';

import { getUniqueId } from "utils/node"

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



export function startListening(){
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    let rootRef = firebase.tree.child(auth.userRef+"/flats/")

    rootRef.on("value", (snap)=>{
      dispatch({
        type: START_LISTERNING_TO_FLAT,
        payload: {
          ref: rootRef, 
          content: snap.val(),
        }
      })
    })
  }
}


