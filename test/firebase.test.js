import {Node} from "../src/utils/node"
import {getVal, toList, paste, create} from "../src/utils/firebaseUtil"
var chai = require("chai")
chai.should()

var firebase = require("firebase")


describe('firebase', function () {

  //initialize firebase
  firebase.initializeApp({
    databaseURL: 'ws://localhost.firebaseio.test:5000',
  });
  var ref = firebase.database().ref().child('/notes/users/simplelogin:f03ad24b-e53c-4a0b-aceb-ee09655742c8/files/BN-1467360362714-UkqoP/nodes/')



  describe('paste', function () {
    it('firebase update same node', function (done) {

      getVal(ref)
      .then((value)=>{
        return toList(value)
      })
      .then((lists)=>{
        //console.log('get list')
        var node = new Node(lists)

        return paste("BN-1467360370407-L0hMd", "BN-1467360372436-5R6yU" , lists, ref)
        .then(()=>{
          return getVal(ref)
        })
        .then(value=>{
          return toList(value)

        })
        .then(function(lists){
          console.log("paste done")
          var node = new Node(lists)
          console.log(node.getParent("BN-1467360370407-L0hMd"))
          console.log(node.getParent("BN-1467360370407-L0hMd").children)
          node.getbyName("BN-1467360367809-CvK5N").children[0].should.equal('BN-1467360372436-5R6yU')
          node.getbyName("BN-1467360367809-CvK5N").children[1].should.equal('BN-1467360370407-L0hMd')
          node.getbyName("BN-1467360367809-CvK5N").children[2].should.equal('BN-1467360373476-QuDqW')
          done()
        })

        .catch(function(err){
          done(err)
        })
      })
    })


    it.only('1 -> 1.1', function (done) {

      getVal(ref)
      .then((value)=>{
        return toList(value)
      })
      .then((lists)=>{
        //console.log('get list')
        var node = new Node(lists)

        return paste( "BN-1467360367809-CvK5N", "BN-1467360370407-L0hMd", lists, ref)
        .then(()=>{
          return getVal(ref)
        })
        .then(value=>{
          return toList(value)

        })
        .then(function(lists){
          console.log("paste done")
          var node = new Node(lists)
          console.log(node.getParent("BN-1467360370407-L0hMd"))
          console.log(node.getParent("BN-1467360370407-L0hMd").children)
          node.getbyName("BN-1467360367809-CvK5N").children[0].should.equal('BN-1467360370407-L0hMd')
          node.getbyName("BN-1467360367809-CvK5N").children[1].should.equal('BN-1467360372436-5R6yU')
          node.getbyName("BN-1467360367809-CvK5N").children[2].should.equal('BN-1467360373476-QuDqW')

          node.getbyName("first_node").children[0].should.equal('BN-1467360367809-CvK5N')
          node.getbyName("first_node").children[1].should.equal('BN-1467360378328-5FynJ')
          done()
        })

        .catch(function(err){
          done(err)
        })
      })
    })


    it('1.2 -> 1.1', function (done) {

      getVal(ref)
      .then((value)=>{
        return toList(value)
      })
      .then((lists)=>{
        //console.log('get list')
        var node = new Node(lists)

        return paste( "BN-1467360372436-5R6yU", "BN-1467360370407-L0hMd", lists, ref)
        .then(()=>{
          return getVal(ref)
        })
        .then(value=>{
          return toList(value)

        })
        .then(function(lists){
          console.log("paste done")
          var node = new Node(lists)
          console.log(node.getParent("BN-1467360370407-L0hMd"))
          console.log(node.getParent("BN-1467360370407-L0hMd").children)
          node.getbyName("BN-1467360367809-CvK5N").children[0].should.equal('BN-1467360370407-L0hMd')
          node.getbyName("BN-1467360367809-CvK5N").children[1].should.equal('BN-1467360372436-5R6yU')
          node.getbyName("BN-1467360367809-CvK5N").children[2].should.equal('BN-1467360373476-QuDqW')
          done()
        })

        .catch(function(err){
          done(err)
        })
      })
    })


    it('firebase 2.1 to 1.1', function (done) {

      getVal(ref)
      .then((value)=>{
        return toList(value)
      })
      .then((lists)=>{
        //console.log('get list')
        var node = new Node(lists)

        return paste("BN-1467360379909-UuGN6", "BN-1467360370407-L0hMd" , lists, ref)
        .then(()=>{
          return getVal(ref)
        })
        .then(value=>{
          return toList(value)

        })
        .then(function(lists){
          console.log("paste done")
          var node = new Node(lists)
          //console.log(node.getParent("BN-1467360370407-L0hMd"))
          //console.log(node.getParent("BN-1467360370407-L0hMd").children)
          node.getbyName("BN-1467360367809-CvK5N").children[0].should.equal('BN-1467360370407-L0hMd')
          node.getbyName("BN-1467360367809-CvK5N").children[1].should.equal('BN-1467360379909-UuGN6') //new 
          node.getbyName("BN-1467360367809-CvK5N").children[2].should.equal('BN-1467360372436-5R6yU')
          node.getbyName("BN-1467360367809-CvK5N").children[3].should.equal('BN-1467360373476-QuDqW')


          //[ "BN-1467360379909-UuGN6", "BN-1467360382162-Gzeoj", "BN-1467360383936-iftwC" 
          node.getbyName("BN-1467360378328-5FynJ").children[0].should.equal('BN-1467360382162-Gzeoj')
          node.getbyName("BN-1467360378328-5FynJ").children[1].should.equal('BN-1467360383936-iftwC')

          done()
        })

        .catch(function(err){
          done(err)
        })
      })
    })

    it('firebase 2.3 to 1.3', function (done) {

      getVal(ref)
      .then((value)=>{
        return toList(value)
      })
      .then((lists)=>{
        //console.log('get list')
        var node = new Node(lists)

        return paste("BN-1467360383936-iftwC", "BN-1467360373476-QuDqW" , lists, ref)
        .then(()=>{
          return getVal(ref)
        })
        .then(value=>{
          return toList(value)

        })
        .then(function(lists){
          console.log("paste done")
          var node = new Node(lists)
          //[ "BN-1467360370407-L0hMd", "BN-1467360372436-5R6yU", "BN-1467360373476-QuDqW" 
          node.getbyName("BN-1467360367809-CvK5N").children.length.should.equal(4)
          node.getbyName("BN-1467360367809-CvK5N").children[0].should.equal('BN-1467360370407-L0hMd')
          node.getbyName("BN-1467360367809-CvK5N").children[1].should.equal('BN-1467360372436-5R6yU')
          node.getbyName("BN-1467360367809-CvK5N").children[2].should.equal('BN-1467360373476-QuDqW')
          node.getbyName("BN-1467360367809-CvK5N").children[3].should.equal('BN-1467360383936-iftwC')// new
          

          //[ "BN-1467360379909-UuGN6", "BN-1467360382162-Gzeoj", "BN-1467360383936-iftwC" 
          node.getbyName("BN-1467360378328-5FynJ").children.length.should.equal(2)
          node.getbyName("BN-1467360378328-5FynJ").children[0].should.equal('BN-1467360379909-UuGN6')
          node.getbyName("BN-1467360378328-5FynJ").children[1].should.equal('BN-1467360382162-Gzeoj')

          done()
        })

        .catch(function(err){
          done(err)
        })
      })
    })
  })



  describe('add', function () {
    it('add should be ok ', function (done) {

      getVal(ref)
      .then((value)=>{
        return toList(value)
      })
      .then((lists)=>{
        var node = new Node(lists)
        var newid = "abc"
        var newNode = {
          collapsed:false,
          content:"",
          fold:false,
          icon:0,
          id: newid,
        }

        return  create('BN-1467360370407-L0hMd', lists, ref, newNode, "CURRENT" )

        .then(function(){
          return getVal(ref)
        })
        .then(value=>{
          return toList(value)
        })
        .then(function(lists){
          var node = new Node(lists)
          //[ "BN-1467360370407-L0hMd", "BN-1467360372436-5R6yU", "BN-1467360373476-QuDqW" 
          node.getbyName("BN-1467360367809-CvK5N").children.length.should.equal(4)
          node.getbyName("BN-1467360367809-CvK5N").children[0].should.equal('BN-1467360370407-L0hMd')
          node.getbyName("BN-1467360367809-CvK5N").children[1].should.equal('abc')// new
          node.getbyName("BN-1467360367809-CvK5N").children[2].should.equal('BN-1467360372436-5R6yU')
          node.getbyName("BN-1467360367809-CvK5N").children[3].should.equal('BN-1467360373476-QuDqW')
          

          /*
          //[ "BN-1467360379909-UuGN6", "BN-1467360382162-Gzeoj", "BN-1467360383936-iftwC" 
          node.getbyName("BN-1467360378328-5FynJ").children.length.should.equal(2)
          node.getbyName("BN-1467360378328-5FynJ").children[0].should.equal('BN-1467360379909-UuGN6')
          node.getbyName("BN-1467360378328-5FynJ").children[1].should.equal('BN-1467360382162-Gzeoj')
          */

          done()
        })

        .catch(function(err){
          done(err)
        })
      })
    })

  })

})
