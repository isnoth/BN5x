import React, { Component } from 'react';
import {stat} from './stat_util'

export default class Stat extends React.Component {

  componentWillMount() {
    stat()
  }

  render(){
    return <p> this is state </p>
  }
}
