import { combineReducers } from 'redux';
import feedbackReducer from './feedback';
import articlesReducer from './articles';
import pomodarioReducer from "./pomodario";


const rootReducer = combineReducers({
	feedback: feedbackReducer,
	articles: articlesReducer,
	pomodario: pomodarioReducer
});

export default rootReducer;
