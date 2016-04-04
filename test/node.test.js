import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {shallow, mount, render} from 'enzyme'
import {expect} from 'chai';
import Node from '../src/components/MyButton';


describe('Shallow Rendering', function () {
  it('Todo item should not have todo-done class', function () {
    const nodes = [{id: 'BN1', content: "taobao"}, {id: "root"}]
    //const nodeItm = shallowRender(Node, {nodes: nodes});
    //console.log("nodeItm: ", nodeItm)
    let app = shallow(<Node nodes={nodes}/>)
    console.log('shallow: ', app)

    //expect(nodeItm.props.children[0].props.className.indexOf('todo-done')).to.equal(-1);
  });
});

