import {
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_MODIFY_FILE_MODAL,
  CLOSE_MODIFY_FILE_MODAL,
  TOGGLE_POMODARIO,
} from './action-types';

export function openLoginModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_LOGIN_MODAL,
      //payload: {key: key}
    })
  }
}

export function closeLoginModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_LOGIN_MODAL,
      //payload: {key: key}
    })
  }
}

export function openModifyFilenameModal() {
  return (dispatch, getState) => {
    dispatch({
      type: OPEN_MODIFY_FILE_MODAL,
      //payload: {key: key}
    })
  }
}

export function closeModifyFilenameModal() {
  return (dispatch, getState) => {
    dispatch({
      type: CLOSE_MODIFY_FILE_MODAL,
      //payload: {key: key}
    })
  }
}

export function togglePomodario() {
  return (dispatch, getState) => {
    dispatch({
      type: TOGGLE_POMODARIO,
    })
  }
}
