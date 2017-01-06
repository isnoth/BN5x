import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import {Col, Row, Panel, } from "react-bootstrap";

import { mdActions } from 'core/md';

import { getUniqueId } from "utils/node"

class MdWrap extends React.Component {

  constructor(props){
    super(props);
    this.createFile = this.createFile.bind(this)
  }

  componentDidMount(){
    const {
      updateList
    } = this.props
    updateList()
  }

  createFile(){
    const {
      auth,
      tree,
      firebase,
    } = this.props

    let rootRef = firebase.tree.child(auth.userRef+"/allInOne/")
    let id = getUniqueId()

    rootRef.child(id).set({id: id}, function(err){
      if (err){
        console.log(err)
      } else{
        console.log("success")
      }
    })
  }


  render(){
    const {
      md
    } = this.props
    //console.log('md is: ', md)

    const l_files = md.fileList.map((i, index)=>{
      console.log("l_files:", i)
      let path = "#md/"+i 
      return <li>
        <a href={path}>{i}</a>
      </li>
    })

    return (<div>
      <Col md={1}>
        aside
        {l_files}

        <button onClick={this.createFile}>create file</button>
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
