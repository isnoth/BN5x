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
	}

  tomatoPlue(e){
    console.log('this.refs:', this.refs)
    this.props.test({a: this.props.article.content, b:this.props.article.tomato_total+1, c: this.props.article.tomato_passed})
		e.preventDefault();
  }

  tomatoMinus(e){
    console.log('this.refs:', this.refs)
    this.props.test({a: this.props.article.content, b:this.props.article.tomato_total-1, c: this.props.article.tomato_passed})
		e.preventDefault();
  }

  tomatoActualPlus(e){
    console.log('this.refs:', this.refs)
    this.props.test({a: this.props.article.content, b:this.props.article.tomato_total, c: this.props.article.tomato_passed+1})
		e.preventDefault();
  }

  tomatoActualMinus(e){
    console.log('this.refs:', this.refs)
    this.props.test({a: this.props.article.content, b:this.props.article.tomato_total, c: this.props.article.tomato_passed-1})
		e.preventDefault();
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
      <span>
        <span ref="tomato">{p.article.tomato_total}</span> {' '} {tomatoButton}
        <span ref="tomato_actual"> {p.article.tomato_passed}</span> {' '} {tomatoActualButton}
      </span>
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
				  <span ref="content">{p.article.content}</span> {button} 
        </div>
        <div className="tomatos">
          <Tomato 
            test={this.props.test}
            article={p.article}
          />
        </div>
        <div className="pomodario">
          <Pomodario/>
        </div>
			</div>
		);
	}
}

export default Article;
