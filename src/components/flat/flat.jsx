import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
var ReactGridLayout = require('react-grid-layout');
import Textarea from 'react-textarea-autosize';
import {OverlayTrigger, Tooltip, Col, Button, ButtonGroup, DropdownButton, MenuItem, Panel, Glyphicon} from "react-bootstrap"

import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'

import { treeActions } from 'core/tree';

import {Node, Panls} from "utils/node"



class TestNode extends React.Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    changeFocus: PropTypes.func.isRequired
  };

  changeCollapse(key, collapsedState){
    const {update, changeFocus} = this.props
    update(key, {type: "COLLAPSED", collapsed: collapsedState})
  }

  updateContent(key, value){
    const {update, changeFocus} = this.props
    update(key, {type: "VALUE", value: value})
  }

  setFocus(key){
    const {update, changeFocus} = this.props
    changeFocus(key)
  }

  render(){

    const {update, changeFocus} = this.props
    var that = this
    var node = new Node(this.props.nodes)
    var panl = new Panls(this.props.nodes)
    var thisnode = node.getbyName(this.props.id)
    var collapsed = thisnode.collapsed
    var children = node.getChildren(this.props.id).map(function(children){
      return <div className="tree-node-child-list">
        <TestNode update={update} changeFocus={changeFocus} nodes={that.props.nodes} id={children.id} />
      </div>
    })

   var changeText = function(evt){
     this.updateContent(thisnode.key, evt.target.value)
   }

    return (
      <div>
        <div className='tree-node-wrapper'>
          <div onClick={this.changeCollapse.bind(this, thisnode.key, !thisnode.collapsed)} className="tree-node-icon-container">
            <Glyphicon className="tree-node-expand-button" glyph={collapsed==false?"minus-sign":"plus-sign"} /> 
          </div>
          <Textarea rows={1} 
            className="tree-textarea mousetrap" 
            cols={60} 
            value={thisnode.content} 
            onChange={changeText.bind(this)} 
            ref="inputNode" 
            onFocus={this.setFocus.bind(this, thisnode.key)}></Textarea>
        </div>
        {collapsed==false?children:null}
      </div>
    )
  }
}




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


  update(){ }
  changeFocus(){ }




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
    console.log(files)
    console.log(params.id)
    console.log('list:', files[params.id])
    const list = files[params.id]
    if (files[params.id] && (files[params.id].list.length>0)){
      const panls = new Panls(list.list)
      let layout1 = panls.getLayout()
      layout1 = layout1.map(i=>{
        return {
          i: i.i,
          x: i.x>50?1:i.x,
          y: i.y>50?1:i.y,
          w: !i.w?1:i.w,
          h: !i.h?1:i.h,
        }
      })
      console.log(layout1)

      let children = panls.root().children.map((nodeName, index)=>{
        const child = panls.getbyName(nodeName)
        return (
          <div key={nodeName}>
            <div>
            {child.content}
            </div>

            <TestNode 
              update={this.update} 
              changeFocus={this.changeFocus} 
              nodes={list.list} 
              id={child.id} />
          </div>

        )
      })

      return (
        <ReactGridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200} onLayoutChange={this.layoutChange.bind(this)} >
          {children}
        </ReactGridLayout>
      )


    }else{
      return (
        <div>
          loading...
        </div>
      )
    }
    
  }

}

export default connect(state => ({
  files: state.files2,
}), treeActions)(Flat);
