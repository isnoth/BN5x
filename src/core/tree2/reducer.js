import {
  CREATE_NODE,
} from './action-types';


export function tree2Reducer(state=[], action) {

  switch (action.type) {
    case CREATE_NODE:
      return [...state, action.payload]

    default:
      return state
  }
}
