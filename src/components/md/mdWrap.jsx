import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Col, Row, Panel, Button, ListGroup, ListGroupItem} from "react-bootstrap";

import { mdActions } from 'core/md';

import { getUniqueId } from "utils/node"

class MdWrap extends React.Component {

  constructor(props){
    super(props);
    const { createFile, getMdContent } = this.props
    this.createFile = createFile.bind(this)
    this.getMdContent = getMdContent.bind(this)
  }

  componentDidMount(){
    const {
      getFileList
    } = this.props
    getFileList()
  }


  render(){
    const {
      md
    } = this.props
    console.log('md is: ', md)

    const l_files = md.articles.map((i, index)=>{
      console.log("l_files:", i)
      let path = "#md/"+i.key
      return <ListGroupItem>
        <a href={path} onClick={this.getMdContent.bind(this, i.key)}>{i.header}</a>
      </ListGroupItem>
    })

    return (<div>
      <Col md={1}>
        <ListGroup>
          {l_files}
        </ListGroup>
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
