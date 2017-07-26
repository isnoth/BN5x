import {
  POMODARIO_SET_VALUE,
  POMODARIO_START,
  POMODARIO_DONE,
  POMODARIO_ABORT,

  GET_POMODARIOS_SUCCESS
} from "./action-types"

const initialState={
  toggle: true, 
  refObj: null,
  refkey: null,
  state: "EDIT",
  current: null,
  startTime: null,
  endTime: null,
  data: {},

  duration: 60*25
}

export function pomodarioReducer(currentstate=initialState, action) {
  //console.log('[pomodario action]: ', action)

  switch (action.type){

    //case SET_REF_OBJ:
    //  return Object.assign({}, currentstate, {refObj:action.payload})
    //case POMODARIO_START:
    //  return Object.assign({}, currentstate, {startTime: new Date()})
    //case POMODARIO_DONE:
    //  return Object.assign({}, currentstate, {endTime: new Date()})
    case GET_POMODARIOS_SUCCESS:
      return Object.assign({}, currentstate, {data: action.payload})

    //case SHOW_POMODARIO:
    //  return Object.assign({}, currentstate, {toggle:true})
    //case HIDE_POMODARIO:
    //  return Object.assign({}, currentstate, {toggle:false})
    //case TOGLE_POMODARIO:
    //  let toggle = !currentstate.toggle
    //  return Object.assign({}, currentstate, {toggle: toggle})
    //case CHANGE_REF_KEY:
    //  return Object.assign({}, currentstate, action.payload)
    case POMODARIO_SET_VALUE:
      return Object.assign({}, currentstate, {current: action.payload})

    case POMODARIO_START:
      return Object.assign({}, currentstate, {state: "ONGOING", startDate: new Date()})

    case POMODARIO_DONE:
      return Object.assign({}, currentstate, {state: "EDIT", endDate: new Date()})

    case POMODARIO_ABORT:
      return Object.assign({}, currentstate, {state: "FAIL", endDate: new Date()})

    default:
      return currentstate
  }
}
