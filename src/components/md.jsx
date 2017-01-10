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

import 'styles/md.less'

class Md extends React.Component {
  constructor(props){
    super(props);
    this.state={
      header: '',
      input: '',
    }

    const { updateFile, editorChangeHeader, editorChangeContent } = this.props

    this.editorChangeHeader = editorChangeHeader.bind(this)
    this.editorChangeContent = editorChangeContent.bind(this)
    this.updateFile = updateFile.bind(this)
    this.contentChange = this.contentChange.bind(this)
    this.headerChange = this.headerChange.bind(this)

  }

  componentDidMount(){
    const {params, getMdContent, md} = this.props
    getMdContent(params.id)
  }

  componentWillReceiveProps(nextProps) {
    const {params, getMdContent, md} = this.props
    if (params.id != nextProps.params.id){
      getMdContent(nextProps.params.id)
    }
  }

  contentChange(evt){
    const {params} = this.props
    console.log(params.id)
    this.editorChangeContent(params.id, evt.target.value)
  }

  headerChange(evt){
    const {params} = this.props
    this.editorChangeHeader(params.id, evt.target.value)
  }


  render(){
    //this.updateInput()
    const {md, params} = this.props

    let content = ''
    let header = ''
    let status = ""
    let fnd = md.articles.filter(i=>i.key==params.id)
    if (fnd.length==1){
      content = fnd[0].content
      header = fnd[0].header
      status = fnd[0].status
    }

    return (<div>
      <Col className="editor" md={5}>
      <Row>
        <input
            type="text"
            value={header} 
            onChange={this.headerChange}
            placeholder="header"/>
        <Button onClick={this.updateFile.bind(this, params.id)}>Submit</Button>
      </Row>
      <Row>
          {status}
          <Textarea
              type="text"
              value={content} 
              onChange={this.contentChange}
              placeholder="content"/>

      </Row>
      </Col>
      <Col md={6}>
      <h2>{header}</h2>
      {<ReactMarkdown source={content} />}
      </Col>

    </div>)
  }
}


export default connect(state =>({
    auth: state.auth,
    tree: state.files2,
    firebase: state.firebase,
    md: state.md
  }),  Object.assign({}, treeActions, mdActions))(Md);
