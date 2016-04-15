import C from '../constants';

const pomodarioRef = new Firebase(C.FIREBASE).child('pomodarios');

const pomodarioActions = {
  toglePomodario(qid, article){
    return (dispatch) => {
      //pomodarioRef.push({article})
      dispatch({type: C.TOGLE_POMODARIO})
      dispatch({type: C.CHANGE_REF_KEY, data: qid})
    }
  },

  changePomodarioKey(qid, refKey) {
    pomodarioRef.push({refKey})
  }
}


export default pomodarioActions;
