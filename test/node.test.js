import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai';
import TestNode from '../src/components/MyButton';
import {Node} from "../src/utils/common"
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
    const nodes = [{id: 'BN1', content: "taobao"}, {id: "root"}]
    //const nodeItm = shallowRender(Node, {nodes: nodes});
    //console.log("nodeItm: ", nodeItm)
    var node = new Node(nodes)
    console.log(node.root())
    console.log(node.getbyName('BN1'))
    //console.log(node)
    //node._lNodes = node
    //console.log(node.root())


    
    //var root = getRoot(nodes)
    //console.log(getRoot)
    //console.log(root)

    //expect(nodeItm.props.children[0].props.className.indexOf('todo-done')).to.equal(-1);
  });
});
