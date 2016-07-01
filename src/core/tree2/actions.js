import {
  CREATE_NODE,
} from './action-types';

export function createNode(value) {
  return (dispatch, getState) => {
    const { tree, firebase } = getState();
    const ref = firebase.tree/*.child('articles');*/

    dispatch({
      type: CREATE_NODE,
      payload: value,
    });

  }

}

