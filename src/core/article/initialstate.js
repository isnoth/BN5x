/*
This is the initial state of the Redux Store.
*/


export default {
	articles: {
		hasreceiveddata: false,
		submittingnew: false,
		states: {}, // articles UI state
		data: {}, // articles data
    showPomodario: false //tells ui if pomodario panel need be shown
	}
};
