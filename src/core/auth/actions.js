import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  UPDATE_PROFILE
} from './action-types';
import { uiActions } from 'core/ui';


export function registerAuthListener(){
  return (dispatch, getState) => {
    const { auth, firebase } = getState();
    const ref = firebase.tree
    ref.onAuth(function(authData){
      if(authData){
        console.log('in auth', authData.uid)
        dispatch({
          type: SIGN_IN_SUCCESS,
        })

        dispatch({
          type: UPDATE_PROFILE,
          payload: authData
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



/*
export function login(data) {

  return (dispatch, getState) => {
    const url = BASE_URL + "auth/loginAjax"
    console.log(url)

    $.post(url, {uid: data.name, password: data.passwd},
      function(data, result){
        console.log('ajax data: ', data, result)

        //dispatch( pubsubActions.notify({ level:"success", message: "login success"}))

        dispatch({
          type: SIGN_IN_SUCCESS,
          //payload: {key: key}
        })

      }
    )
  }

  return (dispatch, getState) => {
    dispatch({
      type: SIGN_IN_SUCCESS,
    })
  }

}
*/

