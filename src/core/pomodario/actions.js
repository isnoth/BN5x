
import {
SHOW_POMODARIO,
HIDE_POMODARIO,
TOGLE_POMODARIO,
CHANGE_REF_KEY
} from "./action-types"



//const pomodarioRef = new Firebase(C.FIREBASE).child('pomodarios'); 
const pomodarioActions = {

  setPomodarioDone(qid, article){
    return (dispatch, getState) => {
      const { /*auth,*/ firebase } = getState();
      var pomodarioRef = firebase.pomodario
      console.log(qid)
      if (qid.refkey != null){
        pomodarioRef.push({qid, date: (new Date()).getTime()})
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

  toglePomodario(qid, article){
    return (dispatch) => {
      //pomodarioRef.push({article})
      dispatch({type: TOGLE_POMODARIO})
      dispatch({type: CHANGE_REF_KEY, data: qid})
    }
  },


}

export default pomodarioActions;
