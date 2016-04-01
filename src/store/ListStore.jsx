var React = require('react');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign')
var Firebase = require('firebase')

var ListStore = assign({}, EventEmitter.prototype,  {
  items : [1,2,3,4,5],

  getAll: function(){
    return this.items
  },

  emitChange: function(){
    this.emit('change');
  },

  addNewItemHandler: function(text){
    this.items.push(text)
  },

  addChangeListener: function(callback){
    this.on('change', callback)
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

  addFirebaseListener: function(url){
    var that= this
    this.ref = new Firebase('https://thisisatestapp.firebaseio.com/items/');
    this.ref.on('value', function(dataSnapshot) {
      var items = []
      dataSnapshot.forEach(function(childSnapshot){
        var item = childSnapshot.val()
        item['.key'] = childSnapshot.key()
        //console.log(childSnapshot.key())
        console.log(item)

        //ButtonActions.addNewItem(item.text)
        items.push(item.text);
      }.bind(this));

      that.items = items
      that.emitChange()
    })
  },

  removeFirebaseListner: function(){
    this.ref.off()
  }

})


module.exports = ListStore

