import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Col, Row, Panel, Button, ListGroup, ListGroupItem, SplitButton, MenuItem} from "react-bootstrap";

import { mdActions } from 'core/md';

import { getUniqueId } from "utils/node"

class MdWrap extends React.Component {

  constructor(props){
    super(props);
    const { createFile, deleteFile, getMdContent } = this.props
    this.createFile = createFile.bind(this)
    this.deleteFile = deleteFile.bind(this)
    this.getMdContent = getMdContent.bind(this)
  }

  render(){
    const {
      md,
    } = this.props
    console.log('md is: ', md)

    const l_files = md.articles.map((i, index)=>{
      console.log("l_files:", i)
      let path = "#md/"+i.key
      return <div>
       <SplitButton onClick={this.getMdContent.bind(this, i.key)} href={path} title={i.header} pullRight id={i.header}>
         <MenuItem onClick={this.deleteFile.bind(this, i.key)}>delete</MenuItem>
       </SplitButton>
      </div>
    })

    return (<div>
      <Col md={2}>
        {l_files}
        <Button onClick={this.createFile}>create </Button>
      </Col>
      {this.props.children}
    </div>)
  }
}

export default connect(state =>({
    auth: state.auth,
    tree: state.files2,
    firebase: state.firebase,
    md: state.md
  }), mdActions )(MdWrap);
