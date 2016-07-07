import {
  GET_FILES_SUCCESS,
  PUSH_TO_TAB,
  POP_TO_TAB,
  GET_FILE_META_SUCCESS
} from './action-types';

export function getFiles() {
  return (dispatch, getState) => {
    const { files, auth, firebase} = getState();
    console.log(auth.userRef)
    const ref = firebase.tree.child(auth.userRef+'directories/nodes/')
    ref.once('value', function(snap){
      //console.log(snap.val())
      let fileList = snap.val()
      dispatch({
        type: GET_FILES_SUCCESS,
        payload: Object.keys(fileList)
      })

      Object.keys(fileList).map(function(i){
        dispatch(getFileMeta(i))
      })

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
