var React = require('react')
var ListStore = require('../store/ListStore') 
var MyButton = require('./MyButton')
var ButtonActions = require('../actions/ButtonActions')
//var FirebaseRef = require('../utils/firebaseUtil')
var TestTree = require("./TestTree")


var MyButtonController = React.createClass({
  getInitialState: function(){
    return {
      items: ListStore.getAll()
      //items: ['abc', 'cde', 'hello','123jk:w ']
    }
  },

  componentDidMount: function(){
    ListStore.addChangeListener(this._onChange)
    ListStore.addFirebaseListener("https://thisisatestapp.firebaseio.com/items/")
  },

  componentWillUnmount: function() {
    ListStore.removeChangeListener(this._onChange);
    ListStore.removeFirebaseListner()
  },

  createNewItem: function(){
    ButtonActions.addNewItem('new item')
    console.log('create new item')
  },

  _onChange: function(){
    this.setState({
      items: ListStore.getAll()
    })
  },

  render: function(){
    var data = {
      item: {text: 'hello world', 
        children:[
          {text: 'hello2',
          children:[
            {text: 'hello2-1'}
          ]},
          {text: 'hello3',
          children:[
            {text: 'hello3-1'}
          ]}
        ] 
      }
    }

    return (
      <div>
        <MyButton
          item={this.state.items}
          onClick={this.createNewItem}
        />
        {/*<TestTree item={data.item}/>*/}
      </div>
    ) } }) 
module.exports = MyButtonController
