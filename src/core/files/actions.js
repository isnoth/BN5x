import {
  GET_FILES_SUCCESS
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


