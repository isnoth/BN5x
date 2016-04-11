import { combineReducers } from 'redux';
import feedbackReducer from './feedback';
import articlesReducer from './articles';

const rootReducer = combineReducers({
	feedback: feedbackReducer,
	articles: articlesReducer
});

export default rootReducer;
