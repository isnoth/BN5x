import {
    RECEIVE_NODES_INIT,
    RECEIVE_NODES_CONTENT,
    RECEIVE_NODES_FINISHED,
    RECEIVE_NODES_FAILED,
    UPDATE_REF,


    START_LISTERNING_TO_FLAT,
    DISABLE_DRAGABLE_FLAT,
    ENABLE_DRAGABLE_FLAT,
    NODE_CUT
} from './action-types';

export const flatInitialState = {
  ref: null,
  content: null,
  flatIsDragable: false,
  cut: null,
  state: "INIT",
};

export function flatReducer(state = flatInitialState, action) {

  switch (action.type) {
    case RECEIVE_NODES_INIT:
      return Object.assign({}, state, {state: "INIT"})

    case RECEIVE_NODES_CONTENT:
      return Object.assign({}, state, {content: Object.assign({}, state.content, action.payload),
                           state: "ONGOING" })

    case RECEIVE_NODES_FINISHED:
      return Object.assign({}, state, {state: "FINISHED"})

    case RECEIVE_NODES_FAILED:
      return Object.assign({}, state, {state: "FAILED"})

    case UPDATE_REF:
      return Object.assign({}, state, {ref: action.payload})



    case START_LISTERNING_TO_FLAT: // only when init
      return Object.assign({}, state, action.payload)

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
