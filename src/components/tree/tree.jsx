import React, { Component } from 'react';
import { treeActions } from 'core/tree';
import { connect } from 'react-redux';


import {Node} from "./node"
import {Glyphicon} from "react-bootstrap"


var TestNode = React.createClass({

  render: function(){

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
        <TestNode nodes={that.props.nodes} id={children.id} />
      </div>
    })
    var changeCollapse = function(){
      //ButtonActions.modifyItem({id: that.props.id, collapsed: !thisnode.collapsed})
      console.log('modify Item')
    }

    return (
      <div>
        <div onClick={changeCollapse} className="tree-node-icon-container">
          <Glyphicon glyph={collapsed==false?"minus":"plus"}/>
        </div>
        <textarea rows={1} className="tree-textarea" cols={60} value={thisnode.content}></textarea>
        <ul>
          {collapsed==false?children:null}
        </ul>
      </div>
    )
  }
})


class About extends React.Component {

  componentWillMount() {
    console.log(this.props.registerListeners)
    this.props.registerListeners();
  }



  render(){
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
            <TestNode nodes={that.props.tree} id={nodeName}/>
          </ul>
        )
      })
      return (<div>
                {node.root().content}
                {children}
              </div>
             )
    }
  }
}

//module.exports = RootNode
//module.exports = TestNode











/*
class About extends React.Component {

  componentWillMount() {
    console.log(this.props.registerListeners)
    this.props.registerListeners();
  }

  render(){

    var nodes = function(list){
      return list.map(function(item){
        return <p>
          {item.content}
        </p>
      })
    }

    return <div> 
        {nodes(this.props.tree)}
      </div>
  }
}
*/




export default connect(state => ({
  //notification: state.notification,
  tree: state.tree.list
}), Object.assign({}, treeActions ))(About);
