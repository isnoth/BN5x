
import React, { Component } from 'react';
import {Glyphicon, Col,Row, Input, Button, ProgressBar } from "react-bootstrap"
import Pomodario from 'components/pomodario/pomodario';
import C from 'core/article/action-types';

class Tomato extends Component{
	constructor() {
		super();
    this.tomatoPlue = this.tomatoPlue.bind(this);
    this.tomatoMinus = this.tomatoMinus.bind(this);
    this.tomatoActualPlus = this.tomatoActualPlus.bind(this);
    this.tomatoActualMinus = this.tomatoActualMinus.bind(this);
    this.toglePomodario = this.toglePomodario.bind(this);
	}

  tomatoPlue(e){
    console.log('this.refs:', this.refs)
    this.props.test({type: C.ESTIMATE_POMODARIO_PLUS})
		e.preventDefault();
  }

  tomatoMinus(e){
    console.log('this.refs:', this.refs)
    this.props.test({type: C.ESTIMATE_POMODARIO_MINUS})
		e.preventDefault();
  }

  tomatoActualPlus(e){
    console.log('this.refs:', this.refs)
    this.props.test({type: C.ACTUAL_POMODARIO_PLUS})
		e.preventDefault();
  }

  tomatoActualMinus(e){
    console.log('this.refs:', this.refs)
    this.props.test({type: C.ACTUAL_POMODARIO_MINUS})
		e.preventDefault();
  }

  toglePomodario(e){
    console.log('this.refs:', this.refs)
    this.props.toglePomodario('reserve')
  }

  render(){
		const p = this.props;

    let tomatoButton =(
      <div className="button_container">
        <div className="button_plus_minus" >
          <span className="button_plus_minus glyphicon glyphicon-triangle-top" onClick={this.tomatoPlue}></span>
        </div>
        <div className="button_plus_minus" >
          <span className="button_plus_minus glyphicon glyphicon-triangle-bottom" onClick={this.tomatoMinus}></span>
        </div>
      </div>
    )

    let tomatoActualButton =(
      <div className="button_container">
        <div className="button_plus_minus" >
          <span className="glyphicon glyphicon-triangle-top" onClick={this.tomatoActualPlus}></span>
        </div>
        <div className="button_plus_minus" >
          <span className="glyphicon glyphicon-triangle-bottom" onClick={this.tomatoActualMinus}></span>
        </div>
      </div>
    )

    return (
      <div className="line">
        <div className="cell" ref="tomato">
          <div className="cell pomodario_number" >
            {p.article.tomato_total}
          </div>
          {tomatoButton}
        </div> 
        <div className="cell" ref="tomato_actual"> 
          <div className="cell pomodario_number" >
            {p.article.tomato_passed}
          </div>
          {tomatoActualButton}
        </div> 
        <div className="cell">
          <button onClick={this.toglePomodario}>
            <span className="glyphicon glyphicon-bell"/>
          </button>
        </div>
      </div>
    )
  }
}


class Article extends Component {
	constructor() {
		super();
		this.submit = this.submit.bind(this);
	}
	submit(e) {
		this.props.submit(this.refs.field.value);
		this.refs.field.value = '';
		e.preventDefault();
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
          <button onClick={p.edit}>Edit</button>
          <button onClick={p.delete}>Delete</button>
          <button onClick={p.changeProperty.bind(this, p.qid, "TOGGLEDONE")}>Done</button>
        </span>;
		}

   return (
     <Row>
       <Col md={6}>
          <span onClick={p.changePomodarioType}>{p.article.type=="home"?"[H]":"[W]"}</span>
		    	<span style={{textDecoration: p.article.done?"line-through":null}}ref="content">{p.article.content}</span> 
       </Col>

       <Col md={3}>
         {button} 
       </Col>
       <Col md={2}>
          <Tomato 
            test={this.props.test}
            toglePomodario = {this.props.toglePomodario}
            article={p.article}
          />
       </Col>
     </Row>
   )
	}
}

export default Article;
