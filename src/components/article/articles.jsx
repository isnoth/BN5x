import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from 'core/article/actions';
import pomodarioAction from "core/pomodario/actions"
import Article from './article';
import PomodarioApp from 'components/pomodario/pomodario'


export default class Articles extends Component {
	constructor() {
		super();
		this.newArticle = this.newArticle.bind(this);
		const p = this.props;
    console.log(p)

    //this.props.startListeningToArticles()
	}


  componentWillMount() {
    //console.log(this.props.registerListeners)
    this.props.startListeningToArticles()
  }

	newArticle(e) {
		if (!this.props.articles.submitting) {
			e.preventDefault();
			this.props.submitNewArticle(this.refs.newarticle.value);
			this.refs.newarticle.value = '';
		}
	}
	render() {
		const p = this.props;
    console.log(p)
		let rows = [];
		if (p.articles.data) {
			rows = Object.keys(p.articles.data).map((qid) => {
				const article = p.articles.data[qid];
				const articlestate = p.articles.states[qid];
				return (
					<Article
						key={qid}
						article={article}
						qid={qid}
						state={articlestate}
						edit={p.startEdit.bind(this, qid)}
						cancel={p.cancelEdit.bind(this, qid)}
						submit={p.submitEdit.bind(this, qid)}
						delete={p.deleteArticle.bind(this, qid)}
            test={p.testPlusTomato.bind(this,qid)}
            changePomodarioType={p.changePomodarioType.bind(this, qid)}
            toglePomodario={p.toglePomodario.bind(this,qid)}
						mayedit={true}
					/>
				);
			});
		}
		return (
      <div>
			  <div className="articleslist">
			  	{p.articles.hasreceiveddata ? rows : 'Loading articles...'}
			  	<form onSubmit={this.newArticle}>
			  		<input ref="newarticle" placeholder="write something clever!"/>
			  		<button type="submit" disabled={p.articles.submittingnew}>{p.articles.submittingnew ? 'Submitting...' : 'Submit'}</button>
			  	</form>
			  </div>
        <PomodarioApp/>
			</div>
		);
	}
}

const mapStateToProps = (appState) => {
	return {
		articles: appState.articles,
		//auth: appState.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
    startListeningToArticles(){dispatch(actions.startListeningToArticles())},
		submitNewArticle(content) { dispatch(actions.submitNewArticle(content)); },
		startEdit(qid) { dispatch(actions.startArticleEdit(qid)); },
		cancelEdit(qid) { dispatch(actions.cancelArticleEdit(qid)); },
		submitEdit(qid, content) { dispatch(actions.submitArticleEdit(qid, content)); },
		deleteArticle(qid) { dispatch(actions.deleteArticle(qid)); },
    testPlusTomato(qid, content) {dispatch(actions.testPlusTomato(qid, content))},
    changePomodarioType(qid, content){dispatch(actions.changePomodarioType(qid, content))},
    toglePomodario(qid, content) {dispatch(pomodarioAction.toglePomodario(qid, content))}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
