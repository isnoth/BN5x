
var React = require('react')

var getRoot = function(obj){
  return '----'
}

var TestNode = React.createClass({
  _getRoot: function(){
    obj.map(function(itm){
      console.log(itm)
    })
    return "--"
  },

  render: function(){
    console.log("[Node]: ", this.props.nodes)
    return (<div>
              {this.props.nodes.content}
              {this.props.nodes.id}
            </div>
           )
  }
})

module.exports = TestNode
