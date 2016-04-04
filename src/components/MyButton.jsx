var React = require('react')


var Node = React.createClass({
  render: function(){
    console.log("[Node]: ", this.props.node)
    return (<div>
              {this.props.node.content}
              {this.props.node.id}
            </div>
           )
  }
})




var MyButton = React.createClass({
  render: function(){
    console.log(this.props.nodes)

    var root
    this.props.nodes.map(function(itm){
      if (itm.id == "root"){
        console.log('root find: ', itm)
        root = itm
        //return <div> {itm.id} </div>
      }
    })

    return <div>{root.id}</div>
  }
})



module.exports = MyButton

