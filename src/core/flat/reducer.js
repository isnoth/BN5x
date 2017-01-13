import {
    START_LISTERNING_TO_FLAT,
} from './action-types';

export const flatInitialState = {
  ref: null,
  content: null,
};

export function flatReducer(state = flatInitialState, action) {

  switch (action.type) {
    case START_LISTERNING_TO_FLAT: // only when init
      return Object.assign({}, state, action.payload)

    default:
      return state
  }
}
