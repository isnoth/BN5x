import C from '../constants';
import Firebase from 'firebase';

const articlesRef = new Firebase(C.FIREBASE).child('articles');

const articlesActions = {
	// called when the app starts. this means we immediately download all articles, and
	// then receive all articles again as soon as anyone changes anything.
	startListeningToArticles() {
		return (dispatch) => {
			articlesRef.on('value', (snapshot) => {
				dispatch({ type: C.RECEIVE_ARTICLES_DATA, data: snapshot.val() });
			});
		};
	},
	startArticleEdit(qid) {
		return { type: C.START_ARTICLE_EDIT, qid };
	},
	cancelArticleEdit(qid) {
		return { type: C.FINISH_ARTICLE_EDIT, qid };
	},
	deleteArticle(qid) {
		return (dispatch) => {
			dispatch({ type: C.SUBMIT_ARTICLE_EDIT, qid });
			articlesRef.child(qid).remove((error) => {
				dispatch({ type: C.FINISH_ARTICLE_EDIT, qid });
				if (error) {
					dispatch({ type: C.DISPLAY_ERROR, error: 'Deletion failed! ' + error });
				} else {
					dispatch({ type: C.DISPLAY_MESSAGE, message: 'Article successfully deleted!' });
				}
			});
		};
	},
	submitArticleEdit(qid, content) {
		return (dispatch, getState) => {
			const state = getState();
			const username = state.auth.username;
			const uid = state.auth.uid;
			const error = false;
			if (error) {
				dispatch({ type: C.DISPLAY_ERROR, error });
			} else {
				dispatch({ type: C.SUBMIT_ARTICLE_EDIT, qid });
				articlesRef.child(qid).set({ content, username, uid }, (error2) => {
					dispatch({ type: C.FINISH_ARTICLE_EDIT, qid });
					if (error2) {
						dispatch({ type: C.DISPLAY_ERROR, error: 'Update failed! ' + error });
					} else {
						dispatch({ type: C.DISPLAY_MESSAGE, message: 'Update successfully saved!' });
					}
				});
			}
		};
	},
	submitNewArticle(content) {
		return (dispatch, getState) => {
			const state = getState();
			const username = state.auth.username;
			const uid = state.auth.uid;
			const error = false;
			if (error) {
				dispatch({ type: C.DISPLAY_ERROR, error });
			} else {
				dispatch({ type: C.AWAIT_NEW_ARTICLE_RESPONSE });
				articlesRef.push({ content, username, uid }, (error2) => {
					dispatch({ type: C.RECEIVE_NEW_ARTICLE_RESPONSE });
					if (error2) {
						dispatch({ type: C.DISPLAY_ERROR, error: 'Submission failed! ' + error });
					} else {
						dispatch({ type: C.DISPLAY_MESSAGE, message: 'Submission successfully saved!' });
					}
				});
			}
		};
	}
};

export default articlesActions;
