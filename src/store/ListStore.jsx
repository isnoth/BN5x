var React = require('react');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign')

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
  }

})


module.exports = ListStore

