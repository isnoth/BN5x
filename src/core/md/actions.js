import {
  UPDATE_FILE_LIST,
  UPDATE_MD_CONTENT
} from './action-types';

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
export function getMdContent(id) {
  return (dispatch, getState) => {
    const { files2, auth, firebase } = getState();
    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/"+id)
    rootRef.once("value", (snap)=>{
      let val = snap.val()

      dispatch({
        type: UPDATE_MD_CONTENT,
        payload: {[id]:val}
      })
    })
  }
}


export function updateFile(id, content) {
  return (dispatch, getState) => {

    const { files2, auth, firebase } = getState();
    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/")
    rootRef.child(id).update({content: content}, function(err){
      if (err){
        console.log(err)
      } else{
        console.log("success")
        return getMdContent(id)
      }
    })
  }
}

