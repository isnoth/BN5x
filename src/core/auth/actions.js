import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  UPDATE_PROFILE
} from './action-types';
import { uiActions } from 'core/ui';


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
          payload: Object.assign({}, authData, {userRef: "/notes/users/"+authData.uid})
        })

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

    ref.authWithPassword(pra, function(err,data){
      if(!err ){
        console.log("auth success!");

        dispatch(uiActions.closeLoginModal())
        dispatch({
          type: SIGN_IN_SUCCESS,
        })


      } else {
        console.log("auth failed,msg:",err);

      }
    })
  }

}


