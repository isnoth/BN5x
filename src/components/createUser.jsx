import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Button, Input, Col, Row, ControlLabel, FormControl} from "react-bootstrap"
import {authActions} from 'core/auth';
console.log("authActions: ", authActions)

class Register extends Component {
	constructor(props) {
    super(props);
    const {createUser} = props
    console.log("props is:", props)
    //createUser()
    this.state = {
      email: "",
      password: ''
    }

    this.register = this.register.bind(this)
    this.changeEmail = this.changeEmail.bind(this)
    this.changePasswd = this.changePasswd.bind(this)
  }

  register(){
    const {createUser} = this.props
    const {email, password} = this.state
    createUser(email, password)
  }

  changeEmail(e){
    this.setState({email: e.target.value})
    console.log(this.state)
  }

  changePasswd(e){
    this.setState({password: e.target.value})
    console.log(this.state)
  }


  render() {

    const {auth} = this.props

    return (
      <Col md={8} mdOffset={2}>
        <ControlLabel>Username:</ControlLabel>
        <FormControl type="email" placeholder="userid" onChange={this.changeEmail}/>

        <ControlLabel>Passwd:</ControlLabel>
        <FormControl type="password" placeholder="password" onChange={this.changePasswd} />

        {auth.createUserStatus == "NULL"?
          null: <p>{auth.createUserInfo} </p>
        }

        <Button onClick={this.register}>Register </Button>

      </Col>
    )
  }
}


export default connect(state =>({
  auth: state.auth
}), Object.assign({}, authActions))(Register)
