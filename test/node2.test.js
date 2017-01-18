import {expect} from 'chai';
import {nodeGetAllChildrenId} from "../src/utils/node2"

describe('node2', function () {
  it.only('getAllChildrenId() should return ok', function () {
    const nodes = {
      BN1: {id: 'BN1', content: "taobao"},
      BN2: {id: 'BN2', content: "taobao"},
      BN3: {id: 'BN3', content: "taobao", children:["BN4"]}, 
      BN4: {id: 'BN4', content: "taobao", children:["BN5"]},
      BN5: {id: 'BN5', content: "taobao"},
      root: {id: "root"}, 
      BNx: {id: 'BNx', children:["BN1","BN2",'BN3']}
    }
    expect(nodeGetAllChildrenId("BN1", nodes).length).to.equal(0)
    expect(nodeGetAllChildrenId("BN4", nodes)[0]).to.equal("BN5")

    expect(nodeGetAllChildrenId("BN3", nodes)[0]).to.equal('BN4')
    expect(nodeGetAllChildrenId("BN3", nodes)[1]).to.equal('BN5')

    expect(nodeGetAllChildrenId("BNx", nodes)[0]).to.equal('BN1')
    expect(nodeGetAllChildrenId("BNx", nodes)[1]).to.equal('BN2')
    expect(nodeGetAllChildrenId("BNx", nodes)[2]).to.equal('BN3')
    expect(nodeGetAllChildrenId("BNx", nodes)[3]).to.equal('BN4')
    expect(nodeGetAllChildrenId("BNx", nodes)[4]).to.equal('BN5')
    //
  })
})
