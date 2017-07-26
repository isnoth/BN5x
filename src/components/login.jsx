import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { hashHistory } from 'react-router'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import { authActions } from 'core/auth';
import { uiActions } from 'core/ui';

import 'styles/electron.less'

class Login extends React.Component {

  constructor(props){
    super(props);
    this.email = ''
    this.password = ''
  }

  componentWillMount() {
    this.props.registerAuthListener();
  }

  handleSubmit(e){
    const {login} = this.props
    console.log(this.email.value, this.password.value)
    login({
      email: this.email.value,
      password: this.password.value,
    })
  }
  componentWillReceiveProps(nextProps){
    const {auth} = nextProps
     if(auth.authenticated === "TRUE"){
       window.location.href = window.location.origin +"#/pomodario/"
       //hashHistory.push(/pomodario/)
     }
  }

  render(){
    return (
      <div className="login">
        <div className="login__form">
          <span>email</span><input ref={(el)=>{this.email = el}}></input>
        </div>
        <div className="login__form">
          <span>passwd</span><input ref={(el)=>{this.password = el}}></input>
        </div>
        <button className="login__btn" onClick={this.handleSubmit.bind(this)}>submit</button>
     </div>
    
    )
  }
}


export default connect((state, ownProps) => ({
  ui: state.uiState,
  auth: state.auth,
}), Object.assign({}, authActions, uiActions ))(Login);

