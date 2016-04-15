import C from '../constants';

const pomodarioRef = new Firebase(C.FIREBASE).child('pomodarios'); 
const pomodarioActions = {

  setPomodarioDone(qid, article){
    return (dispatch) => {
      pomodarioRef.push({qid, date: (new Date()).getTime()})
    }
  },

  toglePomodarioOff(qid, article){
    return (dispatch) => {
      //pomodarioRef.push({article})
      dispatch({type: C.HIDE_POMODARIO})
    }
  },

  toglePomodario(qid, article){
    return (dispatch) => {
      //pomodarioRef.push({article})
      dispatch({type: C.TOGLE_POMODARIO})
      dispatch({type: C.CHANGE_REF_KEY, data: qid})
    }
  },



}

export default pomodarioActions;
