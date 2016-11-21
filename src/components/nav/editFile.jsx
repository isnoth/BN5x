import React from 'react';
import {Input, Panel, Modal, Col, InputGroup, FormControl, ControlLabel, Form, FormGroup, Checkbox, Button} from "react-bootstrap"
//import { authActions } from 'core/auth';
import { uiActions } from 'core/ui';
import { filesActions } from 'core/files';
import { connect } from 'react-redux';

class EditFileModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      filename: ''
    };
  }

  componentWillMount() {
    //this.props.registerAuthListener();
    const {finishEditFileName } = this.props
    this.finishEditFileName = finishEditFileName.bind(this)
  }

  changeName(e){
    this.setState({filename: e.target.value})
    console.log(this.state)
  }

  render(){

    const{ui, openModifyFilenameModal, closeModifyFilenameModal} = this.props
    const doLogin=()=>{
      login(this.state)
      //closeLoginModal()
    }

      return (
        <Modal bsSize="small" show={ui.showModifyFileNameModal} onHide={closeModifyFilenameModal.bind(this)}>
          <Modal.Header closeButton >
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ControlLabel>name</ControlLabel>
            <FormControl type="text" placeholder="filename" onChange={this.changeName.bind(this)}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.finishEditFileName.bind(this, this.state.filename)}>submit </Button>
          </Modal.Footer>
        </Modal>
      )
    }
}

export default connect((state, ownProps) => ({
  ui: state.uiState,
}), Object.assign({}, uiActions, filesActions ))(EditFileModal);


