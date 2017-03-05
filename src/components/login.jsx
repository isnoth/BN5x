import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={
      email : '',
      password : ''
    }
  }

  changeEmail(e){
    this.setState({email: e.target.value})
  }

  changePasswd(e){
    this.setState({password: e.target.value})
  }

  handleSubmit(e){
    const {login} = this.props
    console.log(this.state)
    login(this.state)
  }

  render(){
    return (
      <div>
        <div>
          <span>email</span><input onChange={this.changeEmail.bind(this)}></input>
        </div>
        <div>
          <span>email</span><input onChange={this.changePasswd.bind(this)}></input>
        </div>
        <button onClick={this.handleSubmit.bind(this)}>submit</button>
     </div>
    
    )
  }
}


export default connect(state => ({}), )(Login); 
