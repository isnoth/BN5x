import {Node} from "../utils/common"
var React = require('react')
import {Glyphicon} from "react-bootstrap"


var TestNode = React.createClass({

  render: function(){

    console.log("[Node] nodes: ", this.props.nodes)
    console.log("[Node] id: ", this.props.id)
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

    return (
      <div>
        <div className="tree-node-icon-container">
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


var RootNode = React.createClass({
  render: function(){
    console.log("[Node]: ", this.props.nodes)
    var node = new Node(this.props.nodes)
    console.log(node)
    var that = this


    if (node.root() == null){
      return (<div>
                loading...
              </div>
             )
    }else{
      var children = node.root().children.map(function(nodeName){
        return (
          <ul>
            <TestNode nodes={that.props.nodes} id={nodeName}/>
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
})

module.exports = RootNode
//module.exports = TestNode
