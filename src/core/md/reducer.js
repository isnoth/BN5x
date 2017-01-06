import {
  UPDATE_FILE_LIST,
  UPDATE_MD_CONTENT
} from './action-types';

export const initialState = {
  fileList: [],
  mdContent: ''
};

export function mdReducer(state = initialState, action) {

  switch (action.type) {

    case UPDATE_FILE_LIST:
      return Object.assign({}, state, {fileList: action.payload})

    case UPDATE_MD_CONTENT:
      return Object.assign({}, state, 
               {mdContent: Object.assign({}, state.mdContent, action.payload)})

    default:
      return state
  }
}
