
import {
SHOW_POMODARIO,
HIDE_POMODARIO,
TOGLE_POMODARIO,
CHANGE_REF_KEY
} from "./action-types"



//const pomodarioRef = new Firebase(C.FIREBASE).child('pomodarios'); 
const pomodarioActions = {

  setPomodarioDone(qid, type){
    return (dispatch, getState) => {
      const {firebase, pomodario, auth, articles } = getState();
      const pomodarioRef = firebase.tree.child(auth.userRef+"pomodarios/")
      console.log("pomodarioRef: ", qid)
      if (pomodario.refkey != null){
        console.log("push to server: ", qid, type)
        pomodarioRef.push({qid, date: (new Date()).getTime(), type:type})
      }
    }
  },

  toglePomodarioOff(qid, article){
    return (dispatch) => {
      //pomodarioRef.push({article})
      dispatch({type: HIDE_POMODARIO})
    }
  },

  changePomodarioKey(qid){
    return (dispatch) => {
      dispatch({type: CHANGE_REF_KEY, data: qid})
    }
  },

  toglePomodario(qid, type){
    return (dispatch, getState) => {
      //pomodarioRef.push({article})
      dispatch({type: TOGLE_POMODARIO})
      dispatch({type: CHANGE_REF_KEY, payload: {refkey: qid, type: type }})
    }
  },


}

export default pomodarioActions;
