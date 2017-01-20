import {
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
};

export function flatReducer(state = flatInitialState, action) {

  switch (action.type) {
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
