import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import { flatActions } from 'core/flat';

import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap'
var ReactGridLayout = require('react-grid-layout');
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import Textarea from 'react-textarea-autosize';

import Flat from './flat'
import PomodarioBar from 'components/pomodario/pomodario'
import TestVis from "components/testVis"
import TestVis2 from "components/testVis2"

import { uiActions } from 'core/ui';

import {createChildNode, createBrotherNode } from 'utils/firebase'
import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'


import 'styles/flat.less'
import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'

export class Newflat extends React.Component {
  constructor(props){
    super(props)
    const { createRoot, nodeCreate, nodeCreateChild, nodeUpdate, nodeDelete, nodeUpdateMd, nodeUpdateLayout, togglePomodario } = this.props
    this.createRoot = createRoot.bind(this)
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeCreateChild = nodeCreateChild.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    this.nodeUpdateLayout = nodeUpdateLayout.bind(this)
    this.togglePomodario = togglePomodario.bind(this)
  }

  componentDidMount(){
    this.bindKeys()
  }

  bindKeys(){
    const {toggleTimeline} = this.props

    console.log('document is', document)
    document.addEventListener("keydown", (event)=>{
      console.log('keydown', event.key)

        const keyName = event.key;

        if (keyName === 'Control') {
          return;
        }

        if (event.ctrlKey && keyName=="`") {
          toggleTimeline()
        }


    })
  }

  render(){
    const {flat, params, nodeCut, nodePaste, enableDragableFlat, disableDragableFlat, ui, pomodario } = this.props


    return (
      <Col>
        <Col md={12}>
          <Col md={12}>
            <TestVis/>
          </Col>
          {flat.state == "FINISHED"?  (<Flat 
             flatIsDragable={flat.flatIsDragable}
             enableDragableFlat={enableDragableFlat}
             disableDragableFlat={disableDragableFlat}
             nodeCreate={this.nodeCreate}
             nodeCreateChild={this.nodeCreateChild}
             nodeUpdate={this.nodeUpdate}
             nodeUpdateMd={this.nodeUpdateMd}
             nodeCut={nodeCut}
             nodePaste={nodePaste}
             nodeDelete={this.nodeDelete}
             nodeUpdateLayout={this.nodeUpdateLayout}
             isRoot={true} 
             content={flat.content} 
             _ref={flat.ref}
             _key={params.id}/>):"loading"}
        </Col>
      </Col>
    )
  }
}

export default connect( state=>({flat: state.flat, ui: state.uiState, pomodario: state.pomodario}), Object.assign(flatActions, uiActions))(Newflat);
