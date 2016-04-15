import C from '../../constants';
import initialState from '../initialstate';

export default (currentstate={toggle:false, refkey:null}, action) => {
  console.log('[pomodario action]: ', action)

  switch (action.type){
    case C.SHOW_POMODARIO:
      return Object.assign({}, currentstate, {toggle:true})
    case C.HIDE_POMODARIO:
      return Object.assign({}, currentstate, {toggle:false})
    case C.TOGLE_POMODARIO:
      let toggle = !currentstate.toggle
      return Object.assign({}, currentstate, {toggle: toggle})
    case C.CHANGE_REF_KEY:
      return Object.assign({}, currentstate, {refkey: action.data})
    default:
      return false
  }
}
