import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Col, Row, Panel, } from "react-bootstrap";
import {Glyphicon, Button, Input, FormGroup, FormControl, ControlLabel} from "react-bootstrap"
//var ReactMarkdown = require('react-markdown');
import ReactMarkdown from 'react-markdown'
import Textarea from 'react-textarea-autosize';
//var markdown = require( "markdown" ).markdown

import { mdActions } from 'core/md';

import 'styles/md.less'

class Md extends React.Component {
  constructor(props){
    super(props);

    const { updateFile, editorChangeHeader, editorChangeContent, doEdit, getMdContent } = this.props

    this.editorChangeHeader = editorChangeHeader.bind(this)
    this.editorChangeContent = editorChangeContent.bind(this)
    this.updateFile = updateFile.bind(this)
    this.contentChange = this.contentChange.bind(this)
    this.headerChange = this.headerChange.bind(this)
    this.doEdit = doEdit.bind(this)
  }

  componentDidMount(){
    const {params, getMdContent, md} = this.props
    getMdContent(params.id)
  }

  componentWillReceiveProps(nextProps) {
    //const {params, getMdContent, md} = this.props
    //if (params.id != nextProps.params.id){
    //  getMdContent(nextProps.params.id)
    //}
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
    //const parsedString = markdown.toHTML(content)

    const editor = ()=>{
      if (md.onEdit){
        return (
          <Col className="editor" md={5}>
            <textarea
                className={status=="EDIT"?"on-edit":""}
                type="text"
                value={content} 
                onChange={this.contentChange}
                placeholder="content"/>
            <Button onClick={this.updateFile.bind(this, params.id)}>Submit</Button>

          </Col>
        )
      }
    }

    return (<div>
        <h3>
					<Glyphicon glyph={md.onEdit?"triangle-left":"edit"} onClick={this.doEdit}/>
          <input
                className="content-header"
                type="text"
                value={header} 
                onChange={this.headerChange}
                placeholder="header"/>
        </h3>
            <hr/>
      {editor()}
      <Col className="view" md={5}>
        <ReactMarkdown source={content} />
        {/*<div style={{display: 'inline-block'}}
        dangerouslySetInnerHTML=
              {{__html: parsedString}}>
        </div>*/}
      </Col>

    </div>)
  }
}


export default connect(state =>({
    auth: state.auth,
    firebase: state.firebase,
    md: state.md
  }),  Object.assign({},  mdActions))(Md);
