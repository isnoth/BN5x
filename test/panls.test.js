
import {Panls} from "../src/utils/node"
import {expect, assert} from 'chai';

describe('Panls should be ok', function () {
  it('get layout should return ok', function () {
    const nodes = [
      {id: 'BN1', content: "taobao", x:1, y:2, h:3, w:4},
      {id: 'BN2', content: "taobao", x:11, y:12, h:13, w:14},
      {id: 'BN3', content: "taobao", x:21, y:22, h:23, w:24, children:["BN4"]}, 
      {id: 'BN4', content: "taobao", x:31, y:32, h:33, w:34 },
      {id: 'root', children:["BN1","BN2",'BN3']}
    ]


    var panel = new Panls(nodes)
    const layout = panel.getLayout()
    assert.equal(layout[0].i, "BN1")
    assert.equal(layout[0].x, 1)
    assert.equal(layout[0].y, 2)
    assert.equal(layout[0].h, 3)
    assert.equal(layout[0].w, 4)

    assert.equal(layout[2].i, "BN3")
    assert.equal(layout[2].x, 21)
    assert.equal(layout[2].y, 22)
    assert.equal(layout[2].h, 23)
    assert.equal(layout[2].w, 24)

  })


})

