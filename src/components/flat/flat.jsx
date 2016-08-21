import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
var ReactGridLayout = require('react-grid-layout');
import Textarea from 'react-textarea-autosize';

import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'

import { treeActions } from 'core/tree';


class Flat extends React.Component {

  layoutChange(value){
    console.log(value)
  }

  registerListeners(oldFileId, newFileId, startRegisterListeners){
    if (oldFileId!= newFileId){
      startRegisterListeners(newFileId);
    }else{
      console.log('match!')
    }
  }

  componentDidMount() {
    const {params, files, startRegisterListeners} = this.props
    this.registerListeners(files.key,  params.id, startRegisterListeners)
  }

  render() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
      {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'c', x: 4, y: 0, w: 1, h: 2},
      {i: 'd', x: 4, y: 0, w: 1, h: 2, isDraggable: false}
    ];

    const {files, params} = this.props
    console.log('list:', files[params.id])

    return (



      <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200} onLayoutChange={this.layoutChange.bind(this)} >
        <div key={'a'}>a</div>
        <div key={'b'}>b</div>
        <div key={'c'}>c</div>
        <div key={'d'}>
          <Textarea> </Textarea>

        </div>
      </ReactGridLayout>
    )
  }

}

export default connect(state => ({
  files: state.files2,
}), treeActions)(Flat);
