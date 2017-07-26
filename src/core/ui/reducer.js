import {
  CLOSE_LOGIN_MODAL,
  OPEN_LOGIN_MODAL,
  OPEN_MODIFY_FILE_MODAL,
  CLOSE_MODIFY_FILE_MODAL,
  TOGGLE_POMODARIO,
  TOGGLE_TIMELINE,
  } from './action-types';

export const initialState = {
  showLoginModal: false,
  showCreateModal: false,
  showModifyFileNameModal: false,
  showPomodario: false,
  showTimeline: false,
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

      case TOGGLE_POMODARIO:
        return Object.assign({}, state, {showPomodario: !state.showPomodario})

      case TOGGLE_TIMELINE:
        return Object.assign({}, state, {showTimeline: !state.showTimeline})


    default:
      return state
  }
  //return state;
}
