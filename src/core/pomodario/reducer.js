import {
SHOW_POMODARIO,
HIDE_POMODARIO,
TOGLE_POMODARIO,
CHANGE_REF_KEY
} from "./action-types"

export function pomodarioReducer(currentstate={toggle: true, refkey:null}, action) {
  //console.log('[pomodario action]: ', action)

  switch (action.type){
    case SHOW_POMODARIO:
      return Object.assign({}, currentstate, {toggle:true})
    case HIDE_POMODARIO:
      return Object.assign({}, currentstate, {toggle:false})
    case TOGLE_POMODARIO:
      let toggle = !currentstate.toggle
      return Object.assign({}, currentstate, {toggle: toggle})
    case CHANGE_REF_KEY:
      return Object.assign({}, currentstate, {refkey: action.data})
    default:
      return currentstate
  }
}
