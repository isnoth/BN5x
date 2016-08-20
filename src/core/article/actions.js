import C from './action-types';
//import {CHANGE_VISIBILITY_FILTER} from './action-types';
//import Firebase from 'firebase'; 
//const articlesRef = new Firebase(C.FIREBASE).child('articles');

const articlesActions = {
	// called when the app starts. this means we immediately download all articles, and
	// then receive all articles again as soon as anyone changes anything.
	startListeningToArticles() {
		return (dispatch, getState) => {
      const { auth, firebase } = getState();
      const articlesRef = firebase.tree.child(auth.userRef+"articles/")

			articlesRef.on('value', (snapshot) => {
        if (snapshot.val()){
          dispatch({ type: C.RECEIVE_ARTICLES_DATA, payload: snapshot.val() });
        }
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
		return (dispatch, getState) => {
      const { auth, firebase } = getState();
      const articlesRef = firebase.tree.child(auth.userRef+"articles/")

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

  changeProperty(qid, payload){
		return (dispatch, getState) => {
      const { auth, firebase } = getState();
      const articlesRef = firebase.tree.child(auth.userRef+"articles/")
      console.log(qid, payload)
      switch (payload){
        case "TOGGLEDONE":
          articlesRef.child(qid).transaction((article) => {
            return Object.assign({}, article, {done: !article.done})
          })
      }
    }
  },

	submitArticleEdit(qid, content) {
		return (dispatch, getState) => {
			//const state = getState();
      const { auth, firebase } = getState();
      const articlesRef = firebase.tree.child(auth.userRef+"articles/")
			const username = 'test username'
			const uid = '12345'
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
			//const state = getState();
      const { auth, firebase } = getState();
      const articlesRef = firebase.tree.child(auth.userRef+"articles/")
			const username = 'test username'
			const uid = '12345'
			const error = false;
      const tomato_total =10;
      const tomato_passed = 1;
      const type = "work";

			if (error) {
				dispatch({ type: C.DISPLAY_ERROR, error });
			} else {
				dispatch({ type: C.AWAIT_NEW_ARTICLE_RESPONSE });
				articlesRef.push({ content, username, uid , tomato_total, tomato_passed, type}, (error2) => {
					dispatch({ type: C.RECEIVE_NEW_ARTICLE_RESPONSE });
					if (error2) {
						dispatch({ type: C.DISPLAY_ERROR, error: 'Submission failed! ' + error });
					} else {
						dispatch({ type: C.DISPLAY_MESSAGE, message: 'Submission successfully saved!' });
					}
				});
			}
		};
	},

  setVisibilityFilter(filter){
    return (dispatch, getState) =>{
      dispatch({
        type: C.CHANGE_VISIBILITY_FILTER, 
        payload: filter
      })

    }
  },
  
  changePomodarioType(qid, content){
    return (dispatch, getState) =>{
      const {auth, articles, firebase} = getState()
      //const obj = articles.data[qid] 
      //console.log(articles.data)
      const obj = articles.data.filter(i=>i.key==qid)[0]
      console.log(obj)
      console.log("changePomodarioType", qid, content)
      var newtype = obj.type=="home"?"work":"home"
      console.log("newtype:", newtype)

      const articlesRef = firebase.tree.child(auth.userRef+"articles/")
      articlesRef.child(qid).transaction((article) => {
        return Object.assign({}, article, {type: article.type=="home"?"work":"home"})
      })
    }
  },

};

export default articlesActions;
