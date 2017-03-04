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

import { uiActions } from 'core/ui';

import {createChildNode, createBrotherNode } from 'utils/firebase'
import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'


import 'styles/flat.less'
import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'

export class Newflat extends React.Component {
  constructor(props){
    super(props)
    const { createRoot, nodeCreate, nodeUpdate, nodeDelete, nodeUpdateMd, nodeUpdateLayout, togglePomodario } = this.props
    this.createRoot = createRoot.bind(this)
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    this.nodeUpdateLayout = nodeUpdateLayout.bind(this)
    this.togglePomodario = togglePomodario.bind(this)
  }

  render(){
    const {flat, params, nodeCut, nodePaste, enableDragableFlat, disableDragableFlat, ui, pomodario } = this.props


    return (
      <Col>
        <Col md={12}>
          {flat.state == "FINISHED"?  (<Flat 
             flatIsDragable={flat.flatIsDragable}
             enableDragableFlat={enableDragableFlat}
             disableDragableFlat={disableDragableFlat}
             nodeCreate={this.nodeCreate}
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
             <div onClick={this.togglePomodario}>
               {ui.showPomodario?<PomodarioBar timer={pomodario.duration} onTimeOut={()=>{console.log("timeout")}}/>:"not show"}
             </div>
        </Col>
      </Col>
    )
  }
}

export default connect( state=>({flat: state.flat, ui: state.uiState, pomodario: state.pomodario}), Object.assign(flatActions, uiActions))(Newflat);
