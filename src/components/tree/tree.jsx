import React, { Component, PropTypes} from 'react';
import ReactDOM from "react-dom"
import { treeActions } from 'core/tree';
import { connect } from 'react-redux';


import {Node} from "./node"
import {Panel, Glyphicon} from "react-bootstrap"
import mousetrap from "mousetrap"


class TestNode extends React.Component {

  static propTypes = {
    update: PropTypes.func.isRequired,
    changeFocus: PropTypes.func.isRequired
  };


  componentDidMount(){
    var that = this
    console.log('inputNode:', this.refs)
  }


  changeCollapse(key, collapsedState){
    const {update, changeFocus} = this.props
    //console.log(this.props)
    update(key, {type: "COLLAPSED", collapsed: collapsedState})
  }

  updateContent(key, value){
    const {update, changeFocus} = this.props
    update(key, {type: "VALUE", value: value})
  }

  setFocus(key){
    console.log('setFocus: ', key )
    const {update, changeFocus} = this.props
    changeFocus(key)
  }

  render(){

    const {update, changeFocus} = this.props
    //console.log("[Node] nodes: ", this.props.nodes)
    //console.log("[Node] id: ", this.props.id)
    //var node = new Node(this.props.nodes)
    //console.log(node)
    var that = this
    var node = new Node(this.props.nodes)
    var thisnode = node.getbyName(this.props.id)
    var collapsed = thisnode.collapsed
    var children = node.getChildren(this.props.id).map(function(children){
      return <div className="tree-node-child-list">
        <TestNode update={update} changeFocus={changeFocus} nodes={that.props.nodes} id={children.id} />
      </div>
    })
    /*
    var changeCollapse = function(){
      //ButtonActions.modifyItem({id: that.props.id, collapsed: !thisnode.collapsed})
      console.log('modify Item')
    }
    */

   var changeText = function(evt){
     console.log('changeText: ', evt.target.value)
     this.updateContent(thisnode.key, evt.target.value)
   }

    return (
      <div>
        <div className='tree-node-wrapper'>
          <div onClick={this.changeCollapse.bind(this, thisnode.key, !thisnode.collapsed)} className="tree-node-icon-container">
            <Glyphicon className="tree-node-expand-button" glyph={collapsed==false?"minus-sign":"plus-sign"} /> 
          </div>
          <textarea rows={1} className="tree-textarea mousetrap" cols={60} value={thisnode.content} onChange={changeText.bind(this)} ref="inputNode" onFocus={this.setFocus.bind(this, thisnode.key)}></textarea>
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
    console.log(id)
    var node = new Node(this.props.nodes)
    var thisnode = node.getbyName(this.props.id)
    console.log("thisnode:", thisnode)
    //this.setState({px: thisnode.x, py: thisnode.y})

    this.state =  {
      drag: false,
      px:thisnode.x,
      py:thisnode.y,
      x: 0,
      y: 0 
    };
  }


  render(){
    const {update, changeFocus} = this.props
    console.log(this.props.id)
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

    const panelstyle={
      position: 'absolute',
      left: that.state.px +"px",
      top: that.state.py +"px",
      width: thisnode.width,
      height: thisnode.height,
      overflow: 'scroll',
      border: '1px solid #d4d4d4'
    }

    const drag=function(e){
      e.preventDefault()
      //console.log(e.clientX)
      this.setState({drag: true, x: e.clientX, y: e.clientY})

      console.log(this.state)
    }

    const up=function(e){
      e.preventDefault()
      //console.log(e.clientX)
      //this.setState({drag: true, x: e.clientX, y: e.clientY})

      var _x = this.state.x - e.clientX 
      var _y = this.state.y - e.clientY

      console.log(_x, _y)

      var that = this

      this.setState({drag: false })
      this.setState({px: this.state.px- _x, py: this.state.py - _y})
      console.log(this.state)

    }


    const move=function(e){
      return 
      e.preventDefault()
      //console.log(e)
      //console.log(e.clientX)

      var _x = this.state.x - e.clientX 
      var _y = this.state.y - e.clientY

      console.log(_x, _y)

      console.log(this.state)

      if (this.state.drag){
        this.setState({px: this.state.px- _x, py: this.state.py - _y})
      }
    }


    return (
      <div>
        <div header={thisnode.content} 
             style={panelstyle}>
               <div
                 onMouseDown={drag.bind(this)} 
                 onMouseUp={up.bind(this)} 
                 onMouseMove={move.bind(this)}
                 style={{
                   'flex-direction': 'column',
                   'display': 'flex',
                   'background-color': '#a0a0a0',
                   'height': '10px',
                 }}
                 >
               </div>
          {children}
        </div>
      </div>
    )
  
  }
}








class About extends React.Component {
  static propTypes = {
    registerListeners: PropTypes.func.isRequired,
    nodeUpdate: PropTypes.func.isRequired,
    nodeCreate: PropTypes.func.isRequired
  };


  componentWillMount() {
    console.log(this.props.registerListeners)
    this.props.registerListeners();
  }


  componentDidMount() {
    const {nodeCreate, nodeDelete} = this.props
    //var node = new Node(this.props.tree)
    Mousetrap.bind('ctrl+enter', function() {
      console.log("bind(ctrl+enter)")
      nodeCreate('CURRENT')
    });

    Mousetrap.bind('shift+enter', function() {
      console.log("bind(ctrl+enter)")
      nodeCreate('CHILD')
    });

    Mousetrap.bind('ctrl+del', function() {
      console.log("bind(ctrl+delete)")
      nodeDelete()
    });
  }

  render(){

    const {
      registerListeners, 
      nodeCreate,
      nodeUpdate,
      changeFocus
    } = this.props

    //console.log("[Node]: ", this.props.nodes)
    var node = new Node(this.props.tree)
    console.log("About:", node)
    var that = this


    if (node.root() == null){
      return (<div>
                loading...
              </div>
             )
    }else{
      var children = node.root().children.map(function(nodeName, index){
        return (
          <ul key={index}>
            <TreePanel update={nodeUpdate} changeFocus={changeFocus} nodes={that.props.tree} id={nodeName}/>
          </ul>
        )
      })
      return (<div id="treeBody">
                {node.root().content}
                {children}
              </div>
             )
    }
  }
}








export default connect(state => ({
  //notification: state.notification,
  tree: state.tree.list
}), Object.assign({}, treeActions ))(About);
