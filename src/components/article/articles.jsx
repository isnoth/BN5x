import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findDOMNode } from 'react-dom';

import articlesActions from 'core/article/actions';
import {pomodarioActions} from "core/pomodario"
import Article from './article';
import TestVis from "components/testVis";

import PomodarioApp from 'components/pomodario/pomodario'
import {FormGroup, InputGroup, FormControl, Button, Col, Row, Panel, ListGroupItem, ListGroup} from "react-bootstrap"


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
    console.log('newArticle:', this.refs.newarticle.value)
    console.log(findDOMNode)
    //console.log(this.refs)

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
      setRefObj
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
        const type = t.type
        //console.log(article.done)
          return (
            <ListGroupItem>
				  	  <Article
                setRefObj={setRefObj.bind(this, t)}


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
                toglePomodario={toglePomodario.bind(this, qid, type)}
                changeProperty = {changeProperty}
				  	  	mayedit={true}
				  	  />
            </ListGroupItem>
          )
        })
		return (
      <Col>
      <Col md={12}>
        <TestVis/>
      </Col>

      <Col md={8} mdOffset={2}>
        <Row>
        </Row>

        <ListGroup>
			  {p.articles.hasreceiveddata ? rows : 'Loading articles...'}
        </ListGroup>

        <Row>
          <Col md={12}>
            <Button onClick={setVisibilityFilter.bind(this, "ALL")}>all</Button>
            <Button onClick={setVisibilityFilter.bind(this, "NOTDONE")}>not done</Button>
            <Button onClick={setVisibilityFilter.bind(this, "DONE")}>done</Button>
          </Col>
        </Row>


        <Row>
          <Col md={12}>
            <form onSubmit={this.newArticle}>
              <FormGroup>
                <input ref="newarticle" placeholder="write something clever!"/>
                <Button type="submit" disabled={p.articles.submittingnew}>{p.articles.submittingnew ? 'Submitting...' : 'Submit'}</Button>
              </FormGroup>
            </form>
          </Col>
        </Row>


        <Row>
          <PomodarioApp/>
        </Row>
			</Col>
      </Col>
		);
	}
}


export default connect(state =>({
  articles: state.articles
}), Object.assign({}, pomodarioActions, articlesActions))(Articles); 


