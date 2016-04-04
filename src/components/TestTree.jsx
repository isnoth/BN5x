
var React = require('react')




var TestTree = React.createClass({

  render: function(){
    var that = this
    console.log("this.props: ", this.props.item)
    var children = function(){
      console.log('children:', that.props.item.children)

      if (!that.props.item.children){
        if (that.props.item.text){
          return ( <li> {that.props.item.text} </li>)
        }
      }else{
        return that.props.item.children.map(function(item){
          console.log('children: ' ,item)
          return ( <li>
                    {item.text} 
                    <TestTree item={item}/>
                   </li>)
        })
      }
    }
    return (
      <div>
        {/*this.props.item.text*/}
        <ul>
          {children()}
        </ul>
      </div>
    )
  }
})


module.exports = TestTree
