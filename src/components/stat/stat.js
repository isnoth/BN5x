import React, { Component } from 'react';
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
import {stat} from './stat_util'

export default class Stat extends React.Component {

  componentDidMount() {
    console.log(this)

    const {auth, firebase} = this.props
    var e1 = ReactDOM.findDOMNode(this);
    const pomodarioRef = firebase.tree.child(auth.userRef+"pomodarios/")
    stat(e1, pomodarioRef)

    //console.log(mousetrap)


  }

  render(){
    return <span/> 
  }
}

export default connect(state => ({
  auth: state.auth,
  firebase: state.firebase
}), {})(Stat);

