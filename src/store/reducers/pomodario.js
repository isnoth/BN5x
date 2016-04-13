import C from '../../constants';
import initialState from '../initialstate';

export default (currentstate=false, action) => {
  switch (action.type){
    case C.SHOW_POMODARIO:
      return true
    case C.HIDE_POMODARIO:
      return false
    case C.TOGLE_POMODARIO:
      return !currentstate
    default:
      return false
  }
}
