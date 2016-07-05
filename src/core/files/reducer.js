import {
  GET_FILES_SUCCESS
} from './action-types';

export const initialState = {
  list: [],
};

export function filesReducer(state = initialState, action) {

  switch (action.type) {
    case GET_FILES_SUCCESS:
      return {list: [...action.payload]}

    default:
      return state
  }
}
