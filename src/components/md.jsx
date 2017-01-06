import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Col, Row, Panel, } from "react-bootstrap";
import {Button, Input, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
//var ReactMarkdown = require('react-markdown');
import ReactMarkdown from 'react-markdown'
import Textarea from 'react-textarea-autosize';

import { treeActions } from 'core/tree';
import { mdActions } from 'core/md';

class MdWrap extends React.Component {
  render(){
    return (<div>
      <h2>this is Md</h2>
      <Col md={1}>
        aside
      </Col>
      {this.props.children}
    </div>)
  }
}

class Md extends React.Component {
  constructor(props){
    super(props);
    this.state={
      header: '',
      input: '',
      ref:null,
    }

    //====
    //
    const { updateFile } = this.props

    this.changeEdit = this.changeEdit.bind(this)
    this.changeHeader = this.changeHeader.bind(this)
    this.updateFile = updateFile.bind(this)

  }


  componentDidMount(){
    this.state.ref.value = '123123'

    //this.state.ref.value = md.mdContent[params.id].id
  }

  componentWillReceiveProps(nextProps) {
    //const {params, files, startRegisterListeners} = nextProps
    //this.registerListeners(files.key ,params.id, startRegisterListeners)

    const {params, getMdContent, md} = this.props
    console.log(params, nextProps)
    if (params.id != nextProps.params.id){
      //this.state.ref.value = '123123'
      console.log("params id change:", params.id, nextProps.params.id)
      getMdContent(params.id)
    }

    if (md.mdContent[params.id]){
      this.state.ref.value = md.mdContent[params.id].content
      this.changeEdit()
    }

    //this.state.ref.value = md.mdContent[params.id].id
  }

//  updateFile(){
//    console.log("updateFile:", this.props)
//    const {
//      auth,
//      tree,
//      firebase,
//      params,
//      getMdContent,
//    } = this.props
//
//    let id = params.id
//    let content = this.state.input
//
//    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/")
//    rootRef.child(id).update({content: content}, function(err){
//      if (err){
//        console.log(err)
//      } else{
//        console.log("success")
//        getMdContent(params.id)
//      }
//    })
//  }

  changeEdit(){
    this.setState({
      input: this.state.ref.value
    })
  }

  changeHeader(evt){
    this.setState({
      header: evt.target.value,
    })
  }

  render(){

    return (<div>
      <h2>this is Md</h2>
      <Col md={5}>
      <input
          type="text"
          value={this.state.header} 
          onChange={this.changeHeader}
          placeholder="header"/>

      <FormGroup controlId="formControlsTextarea">
        <ControlLabel>Textarea</ControlLabel>
        <FormControl inputRef={ref=>{
          this.state.ref = ref }}
          componentClass="textarea"
          placeholder="textarea" 
          onKeyUp={this.changeEdit}
          />
      </FormGroup>
      <Button onClick={this.updateFile.bind(this, this.props.params.id, this.state.input)}>Submit</Button>

      </Col>
      <Col md={6}>
      {<ReactMarkdown source={this.state.input} />}
      </Col>

    </div>)
  }
}


class Nd extends React.Component {
  constructor(props){
    super(props)
    const {auth} = this.props
    console.log(auth)
  }
  render(){
    return <h2>this is Nd</h2>
  }
}

export default connect(state =>({
    auth: state.auth,
    tree: state.files2,
    firebase: state.firebase,
    md: state.md
  }),  Object.assign({}, treeActions, mdActions))(Md);
