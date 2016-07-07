
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
      const {pomodario, auth, articles } = getState();
      var pomodarioRef = auth.userRef.child("pomodarios")
      console.log("pomodarioRef: ", qid)
      if (pomodario.refkey != null){
        console.log("push to server: ", qid)
        pomodarioRef.push({qid, date: (new Date()).getTime(), type:articles.data[qid].type})
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
    return (dispatch, getState) => {
      //pomodarioRef.push({article})
      dispatch({type: TOGLE_POMODARIO})
      dispatch({type: CHANGE_REF_KEY, data: qid})
    }
  },


}

export default pomodarioActions;
