import {
  CLOSE_LOGIN_MODAL,
  OPEN_LOGIN_MODAL,
  OPEN_MODIFY_FILE_MODAL,
  CLOSE_MODIFY_FILE_MODAL
} from './action-types';

export const initialState = {
  showLoginModal: false,
  showCreateModal: false,
  showModifyFileNameModal: false,
};

export function uiReducer(state = initialState, action) {

  switch (action.type) {

    case CLOSE_LOGIN_MODAL:
      return Object.assign({}, state, {showLoginModal: false})

    case OPEN_LOGIN_MODAL:
      return Object.assign({}, state, {showLoginModal: true})

    case OPEN_MODIFY_FILE_MODAL:
      return Object.assign({}, state, {showModifyFileNameModal: true})

    case CLOSE_MODIFY_FILE_MODAL:
      return Object.assign({}, state, {showModifyFileNameModal: false})

    default:
      return state
  }
  //return state;
}
