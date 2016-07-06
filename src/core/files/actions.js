import {
  GET_FILES_SUCCESS,
  PUSH_TO_TAB,
  POP_TO_TAB
} from './action-types';

export function getFiles() {
  return (dispatch, getState) => {
    const { auth, firebase} = getState();
    console.log(auth.userRef)
    const ref = firebase.tree.child(auth.userRef+'directories/nodes/')
    ref.once('value', function(snap){
      console.log(snap.val())
      dispatch({
        type: GET_FILES_SUCCESS,
        payload: Object.keys(snap.val())
      })
    })
  }
}



