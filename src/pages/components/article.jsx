import React, { Component } from 'react';
import {Col, Input, Button, ProgressBar } from "react-bootstrap"
import Pomodario from './pomodario';
import C from '../../constants';


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
      <span>
        <button onClick={this.tomatoPlue}>+</button>
        <button onClick={this.tomatoMinus}>-</button>
      </span>
    )

    let tomatoActualButton =(
      <span>
        <button onClick={this.tomatoActualPlus}>+</button>
        <button onClick={this.tomatoActualMinus}>-</button>
      </span>
    )

    return (
      <div className="line">
        <div className="cell" ref="tomato">
          {p.article.tomato_total}
          {tomatoButton}
        </div> 
        <div className="cell" ref="tomato_actual"> 
          {p.article.tomato_passed}
          {tomatoActualButton}
        </div> 
        <div className="cell">
          <button onClick={this.toglePomodario}>POMODARIO</button>
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
			button = <span><button onClick={p.edit}>Edit</button><button onClick={p.delete}>Delete</button></span>;
		}


		return (
			<div className="article">
        <div className="content">
				  <span ref="content">{p.article.content}</span> 
        </div>

        <div className="cell">
          {button} 
        </div>

        <div className="tomatos">
          <Tomato 
            test={this.props.test}
            toglePomodario = {this.props.toglePomodario}
            article={p.article}
          />
        </div>
			</div>
		);
	}
}

export default Article;
