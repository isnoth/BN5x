
import {Node} from "../src/components/tree/node"
var firebase = require("firebase")

var getVal = function(ref, cb){
  ref.once("value", function(snap){
    cb(snap.val())
  })
}

var toList = function(value){
  var lists = Object.keys(value).map(
    function(key){
      return Object.assign(
        {}, 
        value[key],
        {key: key}
      )
    }
  )
  return lists
}

describe('firebase', function () {
  it.only('firebase', function (done) {
    firebase.initializeApp({
      databaseURL: 'ws://localhost.firebaseio.test:5000',
    });

    var ref = firebase.database().ref().child('/notes/users/simplelogin:f03ad24b-e53c-4a0b-aceb-ee09655742c8/files/BN-1467360362714-UkqoP/nodes/')

    getVal(ref, function(value){
      var lists = toList(value)
      var node = new Node(lists)
      console.log(node.print('', 0, 'first_node'))
      done()
    })

  })
})
