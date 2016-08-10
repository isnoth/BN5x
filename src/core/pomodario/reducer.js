import {
SHOW_POMODARIO,
HIDE_POMODARIO,
TOGLE_POMODARIO,
CHANGE_REF_KEY,
POMODARIO_START,
POMODARIO_DONE,
POMODARIO_ABORT,
} from "./action-types"

const initialState={
  toggle: true, 
  refkey: null,
  state: "IDLE",
  startDate: null,
  endDate: null,
}

export function pomodarioReducer(currentstate=initialState, action) {
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
      return Object.assign({}, currentstate, action.payload)

    case POMODARIO_START:
      return Object.assign({}, currentstate, {state: "ONGOING", startDate: new Date()})
    case POMODARIO_DONE:
      return Object.assign({}, currentstate, {state: "IDLE", endDate: new Date()})
    case POMODARIO_ABORT:
      return Object.assign({}, currentstate, {state: "FAIL", endDate: new Date()})

    default:
      return currentstate
  }
}
