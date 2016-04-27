import React, { Component } from 'react';
import ReactDOM from "react-dom"
import {stat} from './stat_util'

export default class Stat extends React.Component {

  componentDidMount() {
    console.log(this)
    var e1 = ReactDOM.findDOMNode(this);
    stat(e1)
  }

  render(){
    return <span/> 
  }
}
