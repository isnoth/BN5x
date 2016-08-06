import React from 'react';
import ReactDOM from 'react-dom';
import {Input, Panel, Modal, Col, InputGroup, FormControl, ControlLabel, Form, FormGroup, Checkbox, Button} from "react-bootstrap"
import { authActions } from 'core/auth';
import { uiActions } from 'core/ui';
import { connect } from 'react-redux';

class LoginModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentWillMount() {
    this.props.registerAuthListener();
  }

  changeName(e){
    this.setState({email: e.target.value})
    console.log(this.state)
  }
  changePasswd(e){
    this.setState({password: e.target.value})
    console.log(this.state)
  }

  render(){

    const{ui, auth, login, closeLoginModal} = this.props
    const doLogin=()=>{
      login(this.state)
      //closeLoginModal()
    }

      return (
        <Modal bsSize="small" show={ui.showLoginModal} onHide={closeLoginModal.bind(this)}>
          <Modal.Header closeButton >
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlLabel>email:</ControlLabel>
            <FormControl type="email" placeholder="Userid" onChange={this.changeName.bind(this)}/>
            <ControlLabel>password:</ControlLabel>
            <FormControl type="password" placeholder="Passwd" onChange={this.changePasswd.bind(this)}/>
            {auth.authenticated!="TRUE"?(<div><hr />{auth.authInfo}</div>):null}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={doLogin.bind(this)}>login </Button>
          </Modal.Footer>
        </Modal>
      )
    }
}

export default connect((state, ownProps) => ({
  ui: state.uiState,
  auth: state.auth,
}), Object.assign({}, authActions, uiActions ))(LoginModal);


