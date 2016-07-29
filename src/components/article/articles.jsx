import React, { Component } from 'react';
import { connect } from 'react-redux';
import articlesActions from 'core/article/actions';
import pomodarioActions from "core/pomodario/actions"
import Article from './article';
import PomodarioApp from 'components/pomodario/pomodario'
import {Button, Col, Row, Panel, ListGroupItem, ListGroup} from "react-bootstrap"


export default class Articles extends Component {
	constructor() {
		super();
		this.newArticle = this.newArticle.bind(this);
		const p = this.props;
    console.log(p)
	}


  componentWillMount() {
    console.log(this.props)
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

    const {articles, 
      startArticleEdit, 
      cancelArticleEdit, 
      submitArticleEdit,
      deleteArticle,
      testPlusTomato,
      changePomodarioType,
      toglePomodario,
      changeProperty,
      setVisibilityFilter,
    } = this.props;


    console.log(p)
		let rows = [];

    const getVisibleTodoes = (articles, filter) =>{
      switch (filter){
        case "ALL":
          return articles;
  
        case "NOTDONE":
          return articles.filter( t => !t.done )

        case "DONE":
          return articles.filter( t => t.done )
  
        default:
          return articles;
      }
    }

      rows = getVisibleTodoes(articles.data, articles.filter).map(t =>{


				const article = t
				const articlestate = articles.states[t.key];
        const qid = t.key
        //console.log(article.done)
          return (
            <ListGroupItem>
				  	  <Article
				  	  	key={qid}
				  	  	article={article}
				  	  	qid={qid}
				  	  	state={articlestate}
				  	  	edit={startArticleEdit.bind(this, qid)}
				  	  	cancel={cancelArticleEdit.bind(this, qid)}
				  	  	submit={submitArticleEdit.bind(this, qid)}
				  	  	delete={deleteArticle.bind(this, qid)}
                test={testPlusTomato.bind(this,qid)}
                changePomodarioType={changePomodarioType.bind(this, qid)}
                toglePomodario={toglePomodario.bind(this,qid)}
                changeProperty = {changeProperty}
				  	  	mayedit={true}
				  	  />
            </ListGroupItem>
          )
        })
		return (
      <Col md={8} mdOffset={2}>
        <Col md={12} >
        <ListGroup>
			  {p.articles.hasreceiveddata ? rows : 'Loading articles...'}
        </ListGroup>
        </Col >

        <Row>
          <Button onClick={setVisibilityFilter.bind(this, "ALL")}>all</Button>
          <Button onClick={setVisibilityFilter.bind(this, "NOTDONE")}>not done</Button>
          <Button onClick={setVisibilityFilter.bind(this, "DONE")}>done</Button>
        </Row>


        <Row>
        <Col md={12}>
          <form onSubmit={this.newArticle}>
          	<input ref="newarticle" placeholder="write something clever!"/>
          	<button type="submit" disabled={p.articles.submittingnew}>{p.articles.submittingnew ? 'Submitting...' : 'Submit'}</button>
          </form>
        </Col>
        </Row>


        <Row>
          <PomodarioApp/>
        </Row>
			</Col>
		);
	}
}


export default connect(state =>({
  articles: state.articles
}), Object.assign({}, pomodarioActions, articlesActions))(Articles); 


