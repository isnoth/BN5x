import {Node} from "../utils/common"
var React = require('react')


var TestNode = React.createClass({

  render: function(){

    console.log("[Node] nodes: ", this.props.nodes)
    console.log("[Node] id: ", this.props.id)
    //var node = new Node(this.props.nodes)
    //console.log(node)
    var that = this
    var node = new Node(this.props.nodes)
    var children = node.getChildren(this.props.id).map(function(children){
      return <li>
        <TestNode nodes={that.props.nodes} id={children.id} />
      </li>
    })

    return (
      <div>
        {/*this.props.id*/}
        {node.getbyName(this.props.id).content}
        <ul>
          {children}
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
