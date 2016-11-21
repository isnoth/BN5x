import {
  GET_FILES_SUCCESS,
  PUSH_TO_TAB,
  POP_TO_TAB,
  GET_FILE_META_SUCCESS,
  START_EDIT_FILE_NAME,
  FINISH_EDIT_FILE_NAME,
  ENABLE_EDIT_LAYOUT,
  DISABLE_EDIT_LAYOUT,
} from './action-types';

import { uiActions } from 'core/ui';
import {Node} from "utils/node"
import {getVal, toList, paste, create, createNeighbourNode, createChildNode} from "utils/firebaseUtil"


export function getFiles() {
  return (dispatch, getState) => {
    const { files, auth, firebase} = getState();
    console.log(auth.userRef)
    const ref = firebase.tree.child(auth.userRef+'directories/nodes/')
    ref.once('value', function(snap){
      console.log(snap.val())
      let fileList = snap.val()
      if (fileList){
        dispatch({
          type: GET_FILES_SUCCESS,
          payload: Object.keys(fileList)
        })

        Object.keys(fileList).map(function(i){
          dispatch(getFileMeta(i))
        })
      }

    })
  }
}

export function pushToTab(fileId){
  return (dispatch, getState) => {
    dispatch({
      type: PUSH_TO_TAB,
      payload: fileId
    })
  }
}



export function getFileMeta(fileId) {
  return (dispatch, getState) => {
    const { auth, firebase} = getState();
    const ref = firebase.tree.child(auth.userRef+'files/'+fileId+'/meta/')
    ref.once('value', function(snap){
      dispatch({
        type: GET_FILE_META_SUCCESS,
        payload: snap.val()
      })
    })
  }
}
export function renameFile(fileId, filename){
  return (dispatch, getState) => {
    const { files, auth, firebase} = getState();
    const metaRef = auth.userRef+'files/'+fileId+'/meta/'
    console.log("metaRef is:", metaRef)
    firebase.tree.child(metaRef).update({name:filename}, function(err){
      if (err){
        console.log(err)
      }
      dispatch(getFileMeta(fileId))
    })
  }
}

export function createFile(){
  return (dispatch, getState) => {
    const { files, auth, firebase} = getState();
    const dirRef = firebase.tree.child(auth.userRef+'directories/nodes/')
    const fileRef = firebase.tree.child(auth.userRef+'files/') 
    const newNodeid = (new Node()).getUniqueId()



    const newFile = {meta: {
       create_time: new Date(),
       id: newNodeid,
       name: "new",
       type: 'flat' },
     nodes:{
       root:{
         children:["first_node", ],
         id: "root",
         width: 20000,
       },
       first_node:{
         content: "",
         fold: false,
         height: 100,
         width: 100,
         x:100,
         y:100,
         zindex: 100,
         id: "first_node",
         collapsed: false
       }
    }}

    dirRef.child(newNodeid).set({id: newNodeid}, function(error){
      if (error){
        console.log(error)
      }else{

        fileRef.child(newNodeid).set(newFile, function(error){
          if (error){
            console.log(error)
          }else{
            dispatch(getFiles())
          }
        })

      }
    })

    //file node
    //file meta

  }
}


export function startEditFileName(fileId){
  return (dispatch, getState) => {

    dispatch(uiActions.openModifyFilenameModal())

    dispatch({
      type: START_EDIT_FILE_NAME,
      payload: fileId
    })

  }
}

export function finishEditFileName(fileName){
  return (dispatch, getState) => {

    const { files} = getState();

    dispatch(renameFile(files.currentEditFileName, fileName ))

    dispatch({
      type: FINISH_EDIT_FILE_NAME,
    })

    dispatch(uiActions.closeModifyFilenameModal())
  }
}


export function enableEditLayout(fileId){
  return (dispatch, getState) => {
    const { files, auth, firebase} = getState();
    const metaRef = auth.userRef+'files/'+fileId+'/meta/'
    console.log("metaRef is:", metaRef)
    firebase.tree.child(metaRef).update({editableLayout: true}, function(err){
      if (err){
        console.log(err)
      }
      dispatch(getFileMeta(fileId))
    })

  }
}

export function disableEditLayout(fileId){
  return (dispatch, getState) => {
    const { files, auth, firebase} = getState();
    const metaRef = auth.userRef+'files/'+fileId+'/meta/'
    console.log("metaRef is:", metaRef)
    firebase.tree.child(metaRef).update({editableLayout: false}, function(err){
      if (err){
        console.log(err)
      }
      dispatch(getFileMeta(fileId))
    })

  }
}

