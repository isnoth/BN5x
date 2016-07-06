import {
  CLOSE_LOGIN_MODAL,
  OPEN_LOGIN_MODAL
} from './action-types';

export const initialState = {
  showLoginModal: false,
  showCreateModal: false,
};

export function uiReducer(state = initialState, action) {

  switch (action.type) {

    case CLOSE_LOGIN_MODAL:
      return Object.assign({}, state, {showLoginModal: false})

    case OPEN_LOGIN_MODAL:
      return Object.assign({}, state, {showLoginModal: true})

    default:
      return state
  }
  //return state;
}
