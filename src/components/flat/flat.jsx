import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { connect } from 'react-redux';
var ReactGridLayout = require('react-grid-layout');
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);
console.log("ResponsiveReactGridLayout:", ResponsiveReactGridLayout)
import Textarea from 'react-textarea-autosize';
import {OverlayTrigger, Tooltip, Col, Button, ButtonGroup, DropdownButton, MenuItem, Panel, Glyphicon} from "react-bootstrap"
var _ = require('lodash')

import 'styles/react-grid-layout.css'
import 'styles/react-resizable.css'
import 'styles/styles.css'

import { treeActions } from 'core/tree';

import {Node, Panls} from "utils/node"



class TestNode extends React.Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    changeFocus: PropTypes.func.isRequired
  };

  changeCollapse(key, collapsedState){
    const {update, changeFocus} = this.props
    update(key, {type: "COMMON", value:{collapsed: collapsedState}})
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

    const {update, changeFocus, isRoot} = this.props
    var that = this
    var node = new Node(this.props.nodes)
    var panl = new Panls(this.props.nodes)
    var thisnode = node.getbyName(this.props.id)
    var collapsed = thisnode.collapsed
    var icon = thisnode.icon
    var changeText = function(evt){
      this.updateContent(thisnode.key, evt.target.value)
    }

    let content;

    if (isRoot){
      content = (
        <div className='tree-node-root'>
          <Textarea
            className="tree-textarea mousetrap" 
            value={thisnode.content} 
            onChange={changeText.bind(this)} 
            onFocus={this.setFocus.bind(this, thisnode.key)}></Textarea>
        </div>
      )
    }else{
      content= (
        <div className='tree-node-wrapper'>
          <div onClick={this.changeCollapse.bind(this, thisnode.key, !thisnode.collapsed)} className="tree-node-icon-container">
            <Glyphicon className="tree-node-expand-button" glyph={collapsed==false?"minus-sign":"plus-sign"} /> 
          </div>
          {icon==1?(<Glyphicon glyph="plane"/>):null}
          <Textarea
            className="tree-textarea mousetrap" 
            value={thisnode.content} 
            onChange={changeText.bind(this)} 
            onFocus={this.setFocus.bind(this, thisnode.key)}></Textarea>
        </div>
      )
    }



    var children = node.getChildren(this.props.id).map(function(children){
      return <div className="tree-node-child-list">
        <TestNode update={update} changeFocus={changeFocus} nodes={that.props.nodes} id={children.id} />
      </div>
    })


    return (
      <div>
        {content}
        {collapsed==false?children:null}
      </div>
    )
  }
}




class Flat extends React.Component {

  constructor(props){
    super(props)
    const {
      nodeUpdate,
      changeFocus, 
      nodeCreateChild,
      nodeCreateNeighbour,
      nodeDelete,
      nodeCut,
      nodePaste,
      updateLayout,
      nodeUpdateIcon,
      files
    } = this.props
    this.nodeUpdate = nodeUpdate.bind(this)
    this.changeFocus = changeFocus.bind(this)

    this.nodeCreateChild = nodeCreateChild.bind(this)
    this.nodeCreateNeighbour = nodeCreateNeighbour.bind(this)
    this.nodeDelete = nodeDelete.bind(this)
    this.nodeCut = nodeCut.bind(this)
    this.nodePaste = nodePaste.bind(this)
    this.nodeUpdateIcon = nodeUpdateIcon.bind(this)

    this.layoutChange = this.layoutChange.bind(this)
    this.layout = [] //store layout for temprary
    this.updateReducerLayout = updateLayout.bind(this)
    this.files = files
  }

  /*
  updateLayout(){
    const {nodeUpdate} = this.props
    const layout = this.state.layout
    nodeUpdate("root", {type: "COMMON", value:{layout: layout}})
  }
  */

  //update layout to server
  layoutChange(oldLayout, value, all){
    console.info("layoutChange:", oldLayout, value)
    const {nodeUpdate} = this.props

    //mobile not update
    if (window.screen.width<600){
      return 
    }

    console.log("old, new layout:", oldLayout, value)
    const update = all.lg.map(i=>(
      {
      i:i.i,
      x:i.x,
      y:i.y,
      w:i.w,
      h:i.h, }
    ))
    if(_.isEqual(oldLayout, update)){
      console.log("layout not change!")
    }else{
      //update layout in server
      console.log("width:", window.screen.width<600)
      nodeUpdate("root", {type: "COMMON", value:{layout: update}})
      console.log("layout:", this.state)
      
     
      //update layout to reducer
      const {params} = this.props
      this.updateReducerLayout(params.id, update)
    }
  }

  registerListeners(oldFileId, newFileId, startRegisterListeners){
    if (oldFileId!= newFileId){
      startRegisterListeners(newFileId);
    }else{
      console.log('match!')
    }
  }

  bindKeys(){
    console.log("bindKeys")

    const {
      nodeCreateChild,
      nodeCreateNeighbour,
      nodeDelete,
      nodeCut,
      nodePaste,
      nodeUpdateIcon,
    } = this


    Mousetrap.bind('ctrl+enter', function() {
      //console.log("bind(ctrl+enter)")
      nodeCreateNeighbour()
    });

    Mousetrap.bind('shift+enter', function(evt) {
      console.log("bind(ctrl+enter)", evt)
      evt.preventDefault()
      nodeCreateChild()
    });

    Mousetrap.bind('ctrl+del', function() {
      //console.log("bind(ctrl+delete)")
      nodeDelete()
    });

    Mousetrap.bind('ctrl+x', function() {
      //console.log("bind(ctrl+x)")
      nodeCut()
    });

    Mousetrap.bind('alt+v', function() {
      //console.log("bind(ctrl+paste)")
      nodePaste()
    });

    Mousetrap.bind('ctrl+shift+1', function() {
      console.log("bind(ctrl+1)", )
      nodeUpdateIcon(1)
    });

    Mousetrap.bind('ctrl+shift+2', function() {
      console.log("bind(ctrl+2)", )
      nodeUpdateIcon(2)
    });
  }


  componentDidMount() {
    const {params, files, startRegisterListeners} = this.props
    this.registerListeners(files.key,  params.id, startRegisterListeners)
    this.bindKeys()
  }

  componentWillReceiveProps(nextProps) {
    const {params, files, startRegisterListeners} = nextProps
    this.registerListeners(files.key ,params.id, startRegisterListeners)
    this.layout = []
  }

  //shouldComponentUpdate(nextProps, nextState){
  //  console.log("nextState:", nextProps, nextState)
  //  const {files} = nextProps
  //  console.log(files.queue.length())
  //  //return !files.queue.length()
  //  return true
  //}

  render() {

    const {files, params} = this.props
    console.log(files)
    console.log(params.id)
    console.log('list:', files[params.id])
    const list = files[params.id]
    if (files[params.id] && (files[params.id].list.length>0)){
      const panls = new Panls(list.list)
      let layout1 = panls.getLayout()
      //console.log('layout1: ', layout1)
      layout1 = !layout1?panls.initLayout():layout1
      //console.log("layout1 is:", layout1)
      //this.setState({layout: layout1})

      let children = panls.root().children.map((nodeName, index)=>{
        const child = panls.getbyName(nodeName)
        return (
          <div key={nodeName}>
            <div className="flat-panel" >
              <TestNode 
                update={this.nodeUpdate} 
                changeFocus={this.changeFocus} 
                nodes={list.list} 
                isRoot={true}
                id={child.id} />
            </div>
          </div>

        )
      })

          //cols={{lg: 48, md: 10, sm: 6, xs: 4, xxs: 2}}
      console.log("before render: ", files.layout)
      //const layout = files.layout.length>0?files.layout:panls.initLayout()
      const layout = files.layout[params.id]
      if (files.layout.length=0){
        return (
          <div>
            loading...
          </div>
        )
      }
      console.log("window.screen.width:", window.screen.width)

      return (

        <ResponsiveReactGridLayout className="layout" layouts={{lg:layout, xs:panls.initLayout()}}
          breakpoints={{lg: 1200,  xs: 480}}
          cols={{lg: 48, xs: 1 }}
          rowHeight={30} 
          onLayoutChange={(current, all)=>{ this.layoutChange(layout1, current, all)}}
          isDraggable={(window.screen.width<600)?false:true}
          isResizable={(window.screen.width<600)?false:true}
          >
          {children}
        </ResponsiveReactGridLayout>

      )
          //onResizeStop={()=>(this.updateLayout())}

        /*
        <ReactGridLayout 
          className="layout" 
          layout={layout1} 
          cols={48}
          rowHeight={30} 
          width={1580} 
          onLayoutChange={value=>(this.layoutChange(layout1, value))} >

          {children}
        </ReactGridLayout>
        */

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
