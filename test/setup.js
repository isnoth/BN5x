import jsdom from 'jsdom';

if (typeof document === 'undefined') {
  global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
  global.window = document.defaultView;
  global.navigator = global.window.navigator;
}

//init firebase server
var fs = require("fs")
var FirebaseServer = require('firebase-server');
fs.readFile("./test/burning-torch-9051-export.json", function(err, data){
  if (err){
    console.log(err)
    //throw err
  }

   var server = new FirebaseServer(5000, 'test.firebase.localhost', JSON.parse(data));
})

