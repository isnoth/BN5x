import {
  UPDATE_FILE_LIST,
  UPDATE_MD_CONTENT,
  START_MD_UPDATE_CONTENT,
  FINISH_MD_UPDATE_CONTENT,

  EDITOR_CHANGE_HEADER,
  EDITOR_CHANGE_CONTENT,
  EDITOR_CHANGE_RENDER
} from './action-types';


import { getUniqueId } from "utils/node"

export function createFile(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/")
    let id = getUniqueId()

    rootRef.child(id).set({id: id, header: "new"}, function(err){
      if (err){
        console.log(err)
      } else{
        console.log("success")
      }
    })

  }
}



export function updateList(list) {
  return (dispatch, getState) => {
    const { files2, auth, firebase } = getState();
    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/")
    rootRef.once("value", (snap)=>{
      let list = snap.val()
      console.log('list is:', list)

      dispatch({
        type: UPDATE_FILE_LIST,
        payload: Object.keys(list)
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


      //dispatch({
      //  type: FINISH_MD_UPDATE_CONTENT,
      //  payload: {id: id,}
      //})
      console.log("getMdContent action!", val)

      dispatch({
        type: FINISH_MD_UPDATE_CONTENT,
        payload: {key: key, content:val.content}
      })
    })
  }
}


export function updateFile(key) {
  return (dispatch, getState) => {

    const { files2, auth, firebase, md } = getState();
    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/")

    let fnd = md.articles.filter(i=>i.key==key)
    if (fnd.length==1){
      rootRef.child(key).update({content: fnd[0].content}, function(err){
        if (err){
          console.log(err)
        } else{
          console.log("update success")
          //return getMdContent(id)
        }
      })
    }else{
      console.log('file structure error!!')
    }

  }
}


export function editorChangeHeader(evt) {
  return (dispatch, getState) => {
      dispatch({
        type: EDITOR_CHANGE_HEADER,
        payload: evt.target.value
      })
  }
}

export function editorChangeContent(key, content) {
  return (dispatch, getState) => {
      dispatch({
        type: EDITOR_CHANGE_CONTENT,
        payload: {key: key, content:content}
      })
  }
}
