import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { filesActions } from 'core/files';
import { connect } from 'react-redux';
import {Button, ButtonGroup, DropdownButton, MenuItem, Panel, Glyphicon} from "react-bootstrap"


class Desciption extends React.Component {
  render(){
    const {params} = this.props

    return (
      <div>
        <p>{params.id}</p>
        <p>description</p>
      </div>
    )
  }

}


export default Desciption
