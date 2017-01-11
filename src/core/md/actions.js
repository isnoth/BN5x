import {
  GET_FILE_LIST,
  FILE_CREATED,
  FILE_DELETED,


  UPDATE_MD_CONTENT,
  START_MD_UPDATE_CONTENT,
  FINISH_MD_UPDATE_CONTENT,

  EDITOR_CHANGE_HEADER,
  EDITOR_CHANGE_CONTENT,
  EDITOR_CHANGE_RENDER,
  EDITOR_COMPLETE,

  TOGGLE_EDIT

} from './action-types';


import { getUniqueId } from "utils/node"

export function createFile(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/files")
    let id = getUniqueId()

    rootRef.child(id).set({key: id, header: "new"}, function(err){
      if (err){
        console.log(err)
      } else{
        console.log("success")
      }
    })

  }
}


export function deleteFile(key){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/files")
    rootRef.child(key).remove()

  }
}




export function getFileList(list) {
  return (dispatch, getState) => {
    const { files2, auth, firebase } = getState();
    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/files")
    rootRef.once("value", (snap)=>{
      let list = snap.val()
      console.log('list is:', list)

      if (list){
        dispatch({
          type: GET_FILE_LIST,
          payload: list
        })
      }
    })

    rootRef.on("child_added", (snap)=>{
      let val = snap.val()
       dispatch({
         type: FILE_CREATED,
         payload: val
       })
    })

    rootRef.on("child_removed", (snap)=>{
      let val = snap.val()
       dispatch({
         type: FILE_DELETED,
         payload: val
       })
    })


  }
}


//can abstract extent to a base utils
export function getMdContent(key) {
  return (dispatch, getState) => {
    const { files2, auth, firebase } = getState();
    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/"+key)


    dispatch({
      type: START_MD_UPDATE_CONTENT,
      payload: {key: key,}
    })

    rootRef.once("value", (snap)=>{
      let val = snap.val()
      console.log("getMdContent action!", val)

      if (val){
        dispatch({
          type: FINISH_MD_UPDATE_CONTENT,
          payload: {key: key, content:val.content}
        })
      }else{
        dispatch({
          type: FINISH_MD_UPDATE_CONTENT,
          payload: {key: key, content:""}
        })
      }
    })
  }
}


export function updateFile(key) {
  return (dispatch, getState) => {

    const { files2, auth, firebase, md } = getState();
    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/")
    let filesRef = rootRef.child("files")

    let fnd = md.articles.filter(i=>i.key==key)
    if (fnd.length==1){
      rootRef.child(key).update({content: fnd[0].content}, function(err){
        if (err){
          console.log(err)
        } else{
          console.log("update content success")

          filesRef.child(key).update({header: fnd[0].header}, function(err){
            if (err){
              console.log(err)
            } else{
              alert('success')
              console.log("update header success")

              dispatch({
                type: EDITOR_COMPLETE,
                payload: {key: key }
              })


            }
          })

          //return getMdContent(id)
        }
      })
    }else{
      console.log('file structure error!!')
    }

  }
}


export function editorChangeHeader(key, header) {
  return (dispatch, getState) => {
      dispatch({
        type: EDITOR_CHANGE_HEADER,
        payload: {key: key, header:header}
      })
  }
}

export function editorChangeContent(key, content) {
  console.log("editorChangeContent", key, content)
  return (dispatch, getState) => {
      dispatch({
        type: EDITOR_CHANGE_CONTENT,
        payload: {key: key, content:content}
      })
  }
}

export function doEdit() {
  return (dispatch, getState) => {
      dispatch({
        type: TOGGLE_EDIT,
      })
  }
}

