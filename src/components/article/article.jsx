
import React, { Component } from 'react';
import {Glyphicon, Col,Row, Input, Button, ProgressBar } from "react-bootstrap"
import Pomodario from 'components/pomodario/pomodario';
import C from 'core/article/action-types';


class Article extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
    this.toglePomodario = this.toglePomodario.bind(this)
	}

	submit(e) {
		this.props.submit(this.refs.field.value);
		this.refs.field.value = '';
		e.preventDefault();
	}

  toglePomodario(e){
    const { setRefObj } = this.props;
    console.log('toglePomodario:', e)
    setRefObj()
    //toglePomodario()
  }

	render() {
		const p = this.props;

		let button;
		if (p.state === C.EDITING_ARTICLE) {
			return (<form className="article" onSubmit={this.submit}>
				<input ref="field" defaultValue={p.article.content}/>
				<button type="button" onClick={p.cancel}>Cancel</button>
				<button type="submit" onClick={this.submit}>Submit</button>
			</form>);
		}

		if (!p.mayedit) {
			button = '';
		} else if (p.state === C.SUBMITTING_ARTICLE) {
			button = <button disabled="disabled">Submitting...</button>;
		} else {
			button = 
        <span>
          <Button onClick={p.edit}>Edit</Button>
          <Button onClick={p.delete}>Delete</Button>
          <Button onClick={p.changeProperty.bind(this, p.qid, "TOGGLEDONE")}>Done</Button>
          <Button onClick={this.toglePomodario}>
            <span className="glyphicon glyphicon-bell"/>
          </Button>
        </span>;
		}

   return (
     <Row>
       <Col md={6}>
          <span onClick={p.changePomodarioType}>{p.article.type=="home"?"[H]":"[W]"}</span>
		    	<span style={{textDecoration: p.article.done?"line-through":null}}ref="content">{p.article.content}</span> 
       </Col>

       <Col md={6}>
         {button} 
       </Col>
     </Row>
   )
	}
}

export default Article;
