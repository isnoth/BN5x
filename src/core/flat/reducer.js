import {
    START_LISTERNING_TO_FLAT,
    START_LISTERNING_TO_FILE,
    LISTERNING_TO_FILE_RECEIVE_CONTENT,
    DISABLE_DRAGABLE_FLAT,
    ENABLE_DRAGABLE_FLAT,
    NODE_CUT
} from './action-types';

export const flatInitialState = {
  ref: null,
  filesRef: [],
  content: null,
  flatIsDragable: false,
  cut: null,
};

export function flatReducer(state = flatInitialState, action) {

  switch (action.type) {
    case START_LISTERNING_TO_FLAT: // only when init
      //return Object.assign({}, state, action.payload)
      return Object.assign({}, state, 
                           {content: Object.assign({}, state.content, action.payload.content),
                           ref: action.payload.ref}
                          )

    case START_LISTERNING_TO_FILE:
      return Object.assign({}, state, 
                           {filesRef: state.filesRef.indexOf(action.payload)>-1?state.filesRef:[...state.filesRef, action.payload]})

    case LISTERNING_TO_FILE_RECEIVE_CONTENT:
      return Object.assign({}, state, {content: Object.assign({}, state.content, action.payload.content )})

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
