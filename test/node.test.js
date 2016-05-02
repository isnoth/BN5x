import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai';
//import TestNode from '../src/components/MyButton';
import {Node} from "../src/components/tree/node"
//import {getRoot} from "../src/components/MyButton"

describe.skip('Shallow Rendering', function () {
  it('Todo item should not have todo-done class', function () {
    const nodes = [{id: 'BN1', content: "taobao"}, {id: "root"}]
    //const nodeItm = shallowRender(Node, {nodes: nodes});
    //console.log("nodeItm: ", nodeItm)
    let app = shallow(<TestNode nodes={nodes}/>)
    //console.log('shallow: ', app)
    //console.log(app.find('.test'))

    //expect(nodeItm.props.children[0].props.className.indexOf('todo-done')).to.equal(-1);
  });
});

describe('TestNode', function () {
  it('getRoot() get root should return ok', function () {
    const nodes = [
      {id: 'BN1', content: "taobao"},
      {id: 'BN2', content: "taobao"},
      {id: 'BN3', content: "taobao"}, 
      {id: "root"}, 
      {id: 'BNx', children:["BN1","BN2",'BN3']}
    ]
    //const nodeItm = shallowRender(Node, {nodes: nodes});
    //console.log("nodeItm: ", nodeItm)
    var node = new Node(nodes)
    //console.log(node.root())
    //console.log(node.getbyName('BN1'))
    //console.log(node.getChildren("BNx"))

    expect(node.root().id).to.equal("root")
    expect(node.getbyName("BN1").id).to.equal("BN1")

    expect(node.getChildren("BNx").length).to.equal(3)
    expect(node.getChildren("BNx")[2].id).to.equal('BN3')
  });

  it('getParent() should return ok', function () {
    const nodes = [
      {id: 'BN1', content: "taobao"},
      {id: 'BN2', content: "taobao"},
      {id: 'BN3', content: "taobao"}, 
      {id: "root"}, 
      {id: 'BNx', children:["BN1","BN2",'BN3']}
    ]
    var node = new Node(nodes)
    expect(node.getParent("BN1").id).to.equal('BNx')

  })


});
