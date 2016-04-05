
var React = require('react')


var MyButton = React.createClass({
  render: function(){
    console.log(this.props.node)

    /*
    this.props.node.map(function(itm){
      if (itm.id == "root"){
        console.log('root find: ', itm)
        root = itm
        //return <div> {itm.id} </div>
      }
    })
    */

    return <div className="test"> test </div>
  }
})



module.exports = MyButton

