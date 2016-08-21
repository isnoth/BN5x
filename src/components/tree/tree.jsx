import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { treeActions } from 'core/tree';
import { connect } from 'react-redux';


import {Node, Panls} from "utils/node"
import {OverlayTrigger, Tooltip, Col, Button, ButtonGroup, DropdownButton, MenuItem, Panel, Glyphicon} from "react-bootstrap"
import mousetrap from "mousetrap"
var ResizableAndMovable =require('react-resizable-and-movable')


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
          <textarea rows={1} 
            className="tree-textarea mousetrap" 
            cols={60} 
            value={thisnode.content} 
            onChange={changeText.bind(this)} 
            ref="inputNode" 
            onFocus={this.setFocus.bind(this, thisnode.key)}></textarea>
        </div>
        {collapsed==false?children:null}
      </div>
    )
  }
}

class TreePanel extends React.Component {
  constructor(props){
    super(props);

    const {update, changeFocus, id, nodes} = this.props
    //console.log(id)
    var node = new Node(this.props.nodes)
    var thisnode = node.getbyName(this.props.id)
    //console.log("thisnode:", thisnode)

  }

  setFocus (key){
    //console.log('setFocus: ', key )
    const {update, changeFocus} = this.props
    changeFocus(key)
  }

  updateContent(key, value){
    const {update, changeFocus} = this.props
    update(key, {type: "VALUE", value: value})
  }




  render(){
    const {update, changeFocus} = this.props
    //console.log(this.props.id)
    var that = this
    var node = new Node(this.props.nodes)
    var thisnode = node.getbyName(this.props.id)
    //this.setState({pa: thisnode.x, pb: thisnode.b})
    var collapsed = thisnode.collapsed

    var children = node.getChildren(this.props.id).map(function(children){
      return <div className="tree-node-child-list">
        <TestNode update={update} changeFocus={changeFocus} nodes={that.props.nodes} id={children.id} />
      </div>
    })
    var that =this

    var changeText = function(evt){
      //console.log('changeText: ', evt.target.value)
      this.updateContent(thisnode.key, evt.target.value)
    }



    return (


      <ResizableAndMovable
          x={thisnode.x}
          y={thisnode.y}
          zIndex={10}
          width={thisnode.width}
          height={thisnode.height}
          style={{
            border: '1px solid #d4d4d4',
            overflow: "auto",
            "overflow-x":"hidden",
            "background-color":"#ffffff"
          }}
          onResize={function(direction,  styleSize, clientSize, delta){
            update(thisnode.key, {type: "COMMON", value:{width:clientSize.width, height:clientSize.height}})
          }}
          onDrag={function(event, ui){
            update(thisnode.key, {type: "COMMON", value:{x:ui.position.left, y:ui.position.top}})
          }}

      >
        <div className="head"
           style={{
             'flex-direction': 'column',
             'display': 'flex',
             'background-color': '#6495ED',
             'height': '10px',
            }}
        >
        </div>
        <textarea rows={1} 
          className="tree-textarea mousetrap" 
          cols={60} 
          value={thisnode.content} 
          onChange={changeText.bind(this)} 
          onFocus={this.setFocus.bind(this, thisnode.key)}>
        </textarea>
        {children}
      </ResizableAndMovable>

    )
  
  }
}


class Flat extends React.Component {
  static propTypes = {
    nodeUpdate: PropTypes.func.isRequired,
    nodeCreateNeighbour: PropTypes.func.isRequired,
    nodeCreateChild: PropTypes.func.isRequired,
    nodeCut: PropTypes.func.isRequired,
    nodePaste: PropTypes.func.isRequired,
  };


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

    //key bindings
    const {nodeCreateNeighbour, nodeCreateChild, nodeDelete, nodeCut, nodePaste} = this.props
    //var node = new Node(this.props.tree)
    Mousetrap.bind('ctrl+enter', function() {
      //console.log("bind(ctrl+enter)")
      nodeCreateNeighbour()
    });

    Mousetrap.bind('shift+enter', function() {
      //console.log("bind(ctrl+enter)")
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


  }

  componentWillReceiveProps(nextProps) {
    const {params, files, startRegisterListeners} = nextProps
    this.registerListeners(files.key ,params.id, startRegisterListeners)
  }

  render(){
    const {files, params} = this.props

    const{
      nodeCreateChild,
      nodeCreateNeighbour,
      nodeUpdate,
      changeFocus,
      createPanel
    }= this.props



    console.log('list:', files[params.id])
    if(files[params.id]){
      console.log(files[params.id].list.length )
    }
    if ((!files[params.id]) || (files[params.id].list.length<=0) ){
      console.log("in")
      return (<div>
                loading...
              </div>
             )
    }else{

      console.log('list:', files[params.id].list)

      let node = new Node(files[params.id].list)
      var that = this

      var children = node.root().children.map(function(nodeName, index){
        return (
          <ul key={index}>
            <TreePanel 
              update={nodeUpdate} 
              changeFocus={changeFocus} 
              nodes={files[params.id].list} 
              id={nodeName}/>
          </ul>
        )
      })
      return (
        <Col md={12}>
          {children}

          <div className="flat-sidebar">
            <OverlayTrigger placement="right" overlay={
              <Tooltip id="tooltip"> create new panel</Tooltip>
            }>
              <Glyphicon onClick={createPanel.bind(this)}glyph="plus"/> 
            </OverlayTrigger>
            <Glyphicon glyph="heart"/> 
            <Glyphicon glyph="remove"/> 
            <Glyphicon glyph="ok"/> 

          </div>

          </Col>
      )
    }


  }
}



export default connect(state => ({
  //notification: state.notification,
  //tree: state.tree.list
  files: state.files2,
}), Object.assign({}, treeActions ))(Flat);
