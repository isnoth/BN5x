import {
  GET_FILES_SUCCESS,
  GET_FILES_CONTENT_SUCCESS,
  PUSH_TO_TAB,
  POP_TO_TAB,
} from './action-types';

export const initialState = {
  idList: [],
  tabList: [],
};

export function filesReducer(state = initialState, action) {

  switch (action.type) {
    case GET_FILES_SUCCESS:
      return Object.assign({}, state, {idList: [...action.payload]})

    case GET_FILES_CONTENT_SUCCESS:
      return state

    case PUSH_TO_TAB:
      return state

    case POP_TO_TAB:
      return state

    default:
      return state
  }
}
