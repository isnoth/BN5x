var Firebase = require('firebase')
var ListStore = require('../store/ListStore')
var ButtonActions = require('../actions/ButtonActions')

var ref = new Firebase('https://thisisatestapp.firebaseio.com/items/');
console.log(ref)
ref.on('value', function(dataSnapshot) {
    console.log(dataSnapshot)
    console.log(dataSnapshot.val())
    var items = []
    dataSnapshot.forEach(function(childSnapshot){
      var item = childSnapshot.val()
      item['.key'] = childSnapshot.key()
      //console.log(childSnapshot.key())
      console.log(item)

      ButtonActions.addNewItem(item.text)
      items.push(item);
    }.bind(this));

});

module.exports = ref




