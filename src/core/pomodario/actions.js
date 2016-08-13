
import {
SHOW_POMODARIO,
HIDE_POMODARIO,
TOGLE_POMODARIO,
CHANGE_REF_KEY,

SET_REF_OBJ,
POMODARIO_START,
POMODARIO_DONE


} from "./action-types"

import { articleActions } from 'core/article';


export function setRefObj(obj){
  console.log("setRefObj", obj)

  return (dispatch, getState) => {
    dispatch({
      type: SET_REF_OBJ,
      payload: obj
    })
  }

}

export function pomodarioRun(){
  return (dispatch, getState) => {
    dispatch({
      type: POMODARIO_START,
    })
  }
}

export function pomodarioTimeout(){
  return (dispatch, getState) => {
    dispatch({
      type: POMODARIO_DONE,
    })
    dispatch(pushPomodarioToServer())
  }
}

export function pomodarioAbort(){
}

export function pushPomodarioToServer(){
  return (dispatch, getState) => {
    const {firebase, pomodario, auth} = getState();
    const pomodarioRef = firebase.tree.child(auth.userRef+"pomodarios/")
    if (pomodario.refObj){
      console.log("push to server: ")
      pomodarioRef.push({key: pomodario.refObj.key, 
                        type: pomodario.refObj.type, 
                        startTime: pomodario.startTime.getTime(),
                        endTime: new Date().getTime(),
                        content: pomodario.refObj.content
      })
    }
  }
}














export function setPomodarioDone(qid, type){
  return (dispatch, getState) => {
    const {firebase, pomodario, auth, articles } = getState();
    const pomodarioRef = firebase.tree.child(auth.userRef+"pomodarios/")
    console.log("pomodarioRef: ", qid)
    if (pomodario.refkey != null){
      console.log("push to server: ", qid, type)
      pomodarioRef.push({qid, date: (new Date()).getTime(), type:type})
    }
  }
}

export function toglePomodarioOff(qid, article){
  return (dispatch) => {
    //pomodarioRef.push({article})
    dispatch({type: HIDE_POMODARIO})
  }
}


export function changePomodarioKey(qid){
  return (dispatch) => {
    dispatch({type: CHANGE_REF_KEY, data: qid})
  }
}

export function toglePomodario(qid, type){
  return (dispatch, getState) => {
    //pomodarioRef.push({article})
    dispatch({type: TOGLE_POMODARIO})
    dispatch({type: CHANGE_REF_KEY, payload: {refkey: qid, type: type }})
  }
}

export function onTimeOut(qid, type) { 
  console.log('disp=>', qid)
  dispatch(articleActions.testPlusTomato(qid, {type: C.ACTUAL_POMODARIO_PLUS}));
  dispatch(toglePomodarioOff(qid, "reserve"));
  dispatch(setPomodarioDone(qid, type));
}

export function changeQid(qid) { 
  console.log('change qid', qid)
  dispatch(changePomodarioKey(qid))
}

