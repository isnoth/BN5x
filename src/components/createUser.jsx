import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Input, Col, Row, ControlLabel, FormControl} from "react-bootstrap"
import {authActions} from 'core/auth';
console.log("authActions: ", authActions)

class Register extends Component {
	constructor(props) {
    super(props);
    const {createUser} = props
    console.log("props is:", props)
    createUser()

  }


  render() {
    return (<Col md={8} mdOffset={2}>
              <p> register </p>
              <ControlLabel>Username:</ControlLabel>
              <FormControl type="email" placeholder="userid" />

              <ControlLabel>Passwd:</ControlLabel>
              <FormControl type="password" placeholder="password" />

            </Col>
           )
  }
}


export default connect(state =>({
  auth: state.auth
}), Object.assign({}, authActions))(Register)
