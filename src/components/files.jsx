import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { filesActions } from 'core/files';
import { connect } from 'react-redux';
import {Button, ButtonGroup, DropdownButton, MenuItem, Panel, Glyphicon} from "react-bootstrap"


class Files extends React.Component {
  componentWillMount(){
    const {getFiles} = this.props
    getFiles()
  }
  render(){
    const {files} = this.props
    const l_files = files.list.map(function(i, index){
      return <MenuItem key={index} eventKey={index}>{i}</MenuItem>
    })

    return (
      <div>

        <ButtonGroup>
          <DropdownButton title="Dropdown" id="bg-nested-dropdown">
          {l_files}
          </DropdownButton>
        </ButtonGroup>


      </div>
    )
  }

}

export default connect(state => ({
  auth: state.auth,
  files: state.files
}), Object.assign({}, filesActions ))(Files);
