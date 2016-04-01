var React = require('react')
var ListStore = require('../store/ListStore') 
var MyButton = require('./MyButton')
var ButtonActions = require('../actions/ButtonActions')
//var FirebaseRef = require('../utils/firebaseUtil')


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
    return <MyButton
      items={this.state.items}
      onClick={this.createNewItem}
    />;
  }
})

module.exports = MyButtonController
