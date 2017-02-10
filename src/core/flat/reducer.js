import {
    START_LISTERNING_TO_FLAT,
    DISABLE_DRAGABLE_FLAT,
    ENABLE_DRAGABLE_FLAT,
    NODE_CUT
} from './action-types';



export const flatInitialState = {
  key: null,
  ref: null,
  content: null
}



export function flatReducer(state = flatInitialState, action) {
}


export const flatsInitialState = {
  ref: null,
  filesRef: [],
  content: null,

  files: {},
  flatIsDragable: false,
  cut: null,
};


export function flatsReducer(state = flatsInitialState, action) {

  switch (action.type) {
    case START_LISTERNING_TO_FLAT: // add  a new to listening 
      return Object.assign({}, state, {files: Object.assign({}, state.files, {[action.payload.key]: action.payload})})

    case DISABLE_DRAGABLE_FLAT: 
      return Object.assign({}, state, {flatIsDragable:false})

    case ENABLE_DRAGABLE_FLAT: 
      return Object.assign({}, state, {flatIsDragable:true})

    case NODE_CUT: 
      return Object.assign({}, state, {cut:action.payload})

    default:
      return state
  }
}
