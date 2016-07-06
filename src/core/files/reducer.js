import {
  GET_FILES_SUCCESS,
  GET_FILES_CONTENT_SUCCESS
} from './action-types';

export const initialState = {
  idList: [],
};

export function filesReducer(state = initialState, action) {

  switch (action.type) {
    case GET_FILES_SUCCESS:
      return {idList: [...action.payload]}

    case GET_FILES_CONTENT_SUCCESS:
      return state

    default:
      return state
  }
}
