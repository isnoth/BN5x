import C from './action-types';

export const initialState = {
		hasreceiveddata: false,
		submittingnew: false,
		states: {}, // articles UI state
		data: {}, // articles data
    showPomodario: false //tells ui if pomodario panel need be shown
};

export function articleReducer (currentstate=initialState, action) {
	let newstate;
	switch (action.type) {
		case C.RECEIVE_ARTICLES_DATA:
			return Object.assign({}, currentstate, {
				hasreceiveddata: true,
				data: action.data
			});
		case C.AWAIT_NEW_ARTICLE_RESPONSE:
			return Object.assign({}, currentstate, {
				submittingnew: true
			});
		case C.RECEIVE_NEW_ARTICLE_RESPONSE:
			return Object.assign({}, currentstate, {
				submittingnew: false
			});
		case C.START_ARTICLE_EDIT:
			newstate = Object.assign({}, currentstate);
			newstate.states[action.qid] = C.EDITING_ARTICLE;
			return newstate;
		case C.FINISH_ARTICLE_EDIT:
			newstate = Object.assign({}, currentstate);
			delete newstate.states[action.qid];
			return newstate;
		case C.SUBMIT_ARTICLE_EDIT:
			newstate = Object.assign({}, currentstate);
			newstate.states[action.qid] = C.SUBMITTING_ARTICLE;
			return newstate;
    case C.CHANGE_STATE_POMODARIO:
			newstate = Object.assign({}, currentstate);
			newstate.states[action.qid].showPomodario = !newstate.states[action.qid].showPomodario 
			return newstate;

		default: return currentstate 
	}
};
