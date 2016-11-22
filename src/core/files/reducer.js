import {
  GET_FILES_SUCCESS,
  GET_FILES_CONTENT_SUCCESS,
  PUSH_TO_TAB,
  POP_TO_TAB,
  GET_FILE_META_SUCCESS,
  START_EDIT_FILE_NAME,
  FINISH_EDIT_FILE_NAME
} from './action-types';

export const initialState = {
  idList: [],
  tabList: [],
  currentEditFileName: null,
  layoutEditble: false,
};

//file reducer means meta balabala...
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

    case START_EDIT_FILE_NAME:
      return Object.assign({}, state, {currentEditFileName: action.payload})

    case FINISH_EDIT_FILE_NAME:
      return Object.assign({}, state, {currentEditFileName: null})

    /*
    case ENABLE_EDIT_LAYOUT:
      return Object.assign({}, state, {layoutEditble: true})

    case DISABLE_EDIT_LAYOUT:
      return Object.assign({}, state, {layoutEditble: false})
      */

    default:
      return state
  }
}
