import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import Textarea from 'react-textarea-autosize';

import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap'
var ReactGridLayout = require('react-grid-layout');
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'

import Node from './node'
import Tree from './tree'

export default class Flat extends Node{
  constructor(props){
    super(props)
    const { nodeCreate, nodeUpdate, nodeDelete, nodeUpdateLayout, nodeUpdateMd} = this.props
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.layoutChange = this.layoutChange.bind(this)
    this.nodeUpdateLayout = nodeUpdateLayout.bind(this)
  }

  updateContent(evt){
    const {_key, content} = this.props
    const val = evt.target.value
    if (val.indexOf("_md_")>-1){
      this.nodeUpdateMd({key: _key, content: val, md: val.slice(4)})
    }else{
      this.nodeUpdate(Object.assign({}, content[_key], {content: val}))
    }
  }

  layoutChange(current, all){
    const {_key, content} = this.props
    this.nodeUpdateLayout(_key, Object.assign({}, content[_key], {layout:current}))
  }

  componentDidMount(){
    const {enableDragableFlat, disableDragableFlat} = this.props

    this.bindKeys()

    document.body.addEventListener("keydown", (ev)=>{
      console.log()
      if (ev.keyCode=="18"){
        enableDragableFlat()
      }
    })

    document.body.addEventListener("keyup", (ev)=>{
      if (ev.keyCode=="18"){
        disableDragableFlat()
      }
    })

  }

  render(){
    const { flatIsDragable, isRoot, content, _key, _ref,  nodeCut, nodePaste, nodeUpdateLayout } = this.props
    //console.log(isRoot, content, _key, _ref)

    let children = content[_key].children?content[_key].children.map(i=>{
      //must need a div to wrap the Node(for ReactGridLayout!!!)
      return <div  key={i}> 
               <Tree 
                 flatIsDragable={flatIsDragable}
                 className="tree-node-wrap"
                 nodeCreate={this.nodeCreate}
                 nodeUpdate={this.nodeUpdate}
                 nodeDelete={this.nodeDelete}
                 nodeUpdateMd={this.nodeUpdateMd}
                 nodeCut={nodeCut}
                 nodePaste={nodePaste}
                 nodeUpdateLayout={nodeUpdateLayout}
                 isRoot={false} 
                 content={content} 
                 _ref={_ref}
                 _key={i}/>
             </div>
    }):null

    let paths = getRootPath(_key, content).map((i)=>{
      //let path = "#newflat/"+i
      return <span><a href={'#/newflat/'+i+'/'}>{content[i].content!=""||content[i].content?content[i].content:"_"}</a> > </span>
    })


    const layouts={lg:content[_key].layout?content[_key].layout:initLayout(content, _key)}
    //console.log("layouts is:", layouts)

    return <div >
          <div>
            <span className='bread-crumbs'>{paths}</span>
            <Textarea 
              ref={(c) => this._input = c}
              className='tree-textarea-root'
              onChange={this.updateContent} 
              value={content[_key].content?content[_key].content:""}/>
          </div>
          <ResponsiveReactGridLayout 
            layouts={layouts}
            breakpoints={{lg: 1200,  xs: 480}}
            cols={{lg: 48, xs: 1 }}
            rowHeight={30} 
            isDraggable={flatIsDragable}
            isResizable={true}
            onLayoutChange={(current, all)=>{ this.layoutChange( current, all)}}
          >
          {children}
        </ResponsiveReactGridLayout>
      </div>
  }
}

