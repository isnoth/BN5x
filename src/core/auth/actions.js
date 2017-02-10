import {
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILED,
  SIGN_IN_ONGOING,
  SIGN_OUT_SUCCESS,
  UPDATE_PROFILE,
  CREATE_USER_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_INIT,
  CREATE_USER_ONGOING
} from './action-types';
import { uiActions } from 'core/ui';
import { filesActions } from 'core/files';
import { mdActions } from 'core/md';
import { flatActions } from 'core/flat';


export function registerAuthListener(){
  return (dispatch, getState) => {
    const { auth, firebase } = getState();

    const ref = firebase.tree/*.child('articles');*/

    ref.onAuth(function(authData){
      if(authData){
        console.log('in auth', authData)
        dispatch({
          type: SIGN_IN_SUCCESS,
        })


        dispatch({
          type: UPDATE_PROFILE,
          payload: Object.assign({}, authData, {userRef: "/notes/users/"+authData.uid+'/'})
        })


        dispatch(mdActions.getFileList()) //for markdown
        dispatch(flatActions.startListening('root'))
        //setTimeout( dispatch(filesActions.getFiles()), 1000)

      }else{
        dispatch({
          type: SIGN_OUT_SUCCESS,
        })
      }
    })

  }
}

export function logout() {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const ref = firebase.tree
    ref.unauth()
  }
}



export function login(pra) {
  return (dispatch, getState) => {
    const { tree, firebase } = getState();
    const ref = firebase.tree/*.child('articles');*/

    dispatch({
      type: SIGN_IN_ONGOING,
    })

    ref.authWithPassword(pra, function(err,data){
      if(!err ){
        console.log("auth success!");

        dispatch(uiActions.closeLoginModal())
        dispatch({
          type: SIGN_IN_SUCCESS,
        })

        dispatch(mdActions.getFileList()) //for markdown

      } else {
        console.log("auth failed,msg:",err);
        dispatch({
          type: SIGN_IN_FAILED,
          payload: err.toString()
        })

      }
    })
  }

}


export function createUser(email, password) {
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const ref = firebase.tree

    //dispatch({type: CREATE_USER_INIT})
    dispatch({type: CREATE_USER_ONGOING})

    ref.createUser({email:email, password:password},
    function(err,data){
      console.log(err)
      if(err!=null){
        dispatch({type: CREATE_USER_FAIL,
          payload: err.toString()
        })
        //not success
      } else {
        dispatch({type: CREATE_USER_SUCCESS})
        //create user success
      }
    });

  }
}

