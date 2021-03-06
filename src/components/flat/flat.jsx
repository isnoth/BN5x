import React from 'react';
import { connect } from 'react-redux'; 
import { hashHistory } from 'react-router'

import Textarea from 'react-textarea-autosize';

import {Col, Glyphicon, ButtonGroup, Button} from 'react-bootstrap'
var ReactGridLayout = require('react-grid-layout');
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import {getParent, getUniqueId, initLayout, getRootPath} from 'utils/node2'

import {IntervalEnhance} from "./keyboard"

import Node from './node'
import Tree from './tree'

class Flat extends React.Component {
  constructor(props){
    super(props)
    const { nodeCreate, nodeCreateChild, nodeUpdate, nodeDelete, nodeUpdateLayout, nodeUpdateMd} = this.props
    this.nodeCreate = nodeCreate.bind(this)
    this.nodeCreateChild = nodeCreateChild.bind(this)
    this.nodeUpdate = nodeUpdate.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeUpdateMd = nodeUpdateMd.bind(this)
    this.updateContent = this.updateContent.bind(this)
    this.layoutChange = this.layoutChange.bind(this)
    this.nodeUpdateLayout = nodeUpdateLayout.bind(this)
    this.onResize = this.onResize.bind(this)
    this.state = {
      resized: false
    }
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

  onResize(){
    this.setState({resized: !this.state.resized})
  }

  layoutChange(current, all){
    const {_key, content} = this.props
    this.nodeUpdateLayout(_key, Object.assign({}, content[_key], {layouts:all}))
  }

  componentDidMount(){
    const {enableDragableFlat, disableDragableFlat} = this.props

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
    const { flatIsDragable, isRoot, content, _key, _ref,  nodeCut, nodePaste, nodeUpdateLayout, nodeCreateNebour } = this.props
    //console.log(isRoot, content, _key, _ref)

    let children = content[_key].children?content[_key].children.map(i=>{
      //must need a div to wrap the Node(for ReactGridLayout!!!)
      return <div  key={i}> 
               <Tree 
                 flatIsDragable={flatIsDragable}
                 className="tree-node-wrap"
                 nodeCreate={this.nodeCreate}
                 nodeCreateNebour={nodeCreateNebour}
                 nodeCreateChild={this.nodeCreateChild}
                 nodeUpdate={this.nodeUpdate}
                 nodeDelete={this.nodeDelete}
                 nodeUpdateMd={this.nodeUpdateMd}
                 nodeCut={nodeCut}
                 nodePaste={nodePaste}
                 nodeUpdateLayout={nodeUpdateLayout}
                 isRoot={false} 
                 content={content} 
                 _ref={_ref}
                 _parent={_key}
                 _key={i}
                 resized={this.state.resized}
                 />
             </div>
    }):null

    let paths = getRootPath(_key, content).map((i)=>{
      //let path = "#newflat/"+i
      return <span><a href={'#/newflat/'+i+'/'}>{content[i].content!=""||content[i].content?content[i].content:"_"}</a> > </span>
    })

    let layouts = content[_key].layouts

    //console.log("layout is:", layout)

    layouts = layouts?layouts:initLayout(content, _key)

    //update layout when width/height = 1
    console.log("layout is:", layouts)
    if (layouts){
      if (layouts.lg){
        layouts.lg.forEach(i=>{
          if (i.h < 2){
            i.h = 2
          }
          if (i.w <2){
            i.w = 2
          }
        })
      }

      if (layouts.xs){
        layouts.xs.forEach(i=>{
          if (i.h < 2){
            i.h = 2
          }
          if (i.w <2){
            i.w = 2
          }
        })
      }
    }

    console.log("layouts is:", layouts)

    //const layouts={lg:layout?layout:initLayout(content, _key)}

    return <div >
            <span className='bread-crumbs'>{paths}</span>
            <textarea 
              ref={(c) => this._input = c}
              className='tree-textarea-root'
              onChange={this.updateContent} 
              value={content[_key].content?content[_key].content:""}/>
          <ResponsiveReactGridLayout 
            layouts={layouts}
            breakpoints={{lg: 1200,  xs: 480}}
            cols={{lg: 48, xs: 1 }}
            rowHeight={30} 
            isDraggable={flatIsDragable}
            isResizable={true}
            onLayoutChange={(current, all)=>{ this.layoutChange( current, all)}}
            onResizeStop={this.onResize}
          >
          {children}
        </ResponsiveReactGridLayout>
      </div>
  }
}

export default Flat
