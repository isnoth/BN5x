import {
  GET_FILES_SUCCESS,
  GET_FILES_CONTENT_SUCCESS,
  PUSH_TO_TAB,
  POP_TO_TAB,
  GET_FILE_META_SUCCESS,
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
      return Object.assign({}, state, {tabList: [...state.tabList, action.payload]})

    case POP_TO_TAB:
      return state

    case GET_FILE_META_SUCCESS:
      return Object.assign({}, state, {[action.payload.id]: action.payload})

    default:
      return state
  }
}
