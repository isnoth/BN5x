import {expect} from 'chai';
import {flatReducer} from './reducer'
import { RECEIVE_NODES_INIT,
    RECEIVE_NODES_CONTENT,
    RECEIVE_NODES_FINISHED,
    RECEIVE_NODES_FAILED,
    START_LISTERNING_TO_FLAT,
    DISABLE_DRAGABLE_FLAT,
    ENABLE_DRAGABLE_FLAT,
    NODE_CUT
} from './action-types';


describe('Array', function() {
  it('default should be ok', function () {
		expect(
			JSON.stringify( flatReducer( undefined, {}))
    ).to.equal(
			JSON.stringify(
        {
          ref: null,
          content: null,
          flatIsDragable: false,
          cut: null,
          state: "INIT"
        }
      )
    )
  })

  it('init should be ok', function () {
		expect(
			JSON.stringify( flatReducer( undefined, {type: RECEIVE_NODES_INIT}))
    ).to.equal(
			JSON.stringify(
        {
          ref: null,
          content: null,
          flatIsDragable: false,
          cut: null,
          state: "INIT"
        }
      )
    )
  })


  it('finished should be ok', function () {
		expect(
			JSON.stringify( flatReducer( undefined, {type: RECEIVE_NODES_FINISHED}))
    ).to.equal(
			JSON.stringify(
        {
          ref: null,
          content: null,
          flatIsDragable: false,
          cut: null,
          state: "FINISHED"
        }
      )
    )
  })


  it('failed should be ok', function () {
		expect(
			JSON.stringify( flatReducer( undefined, {type: RECEIVE_NODES_FAILED}))
    ).to.equal(
			JSON.stringify(
        {
          ref: null,
          content: null,
          flatIsDragable: false,
          cut: null,
          state: "FAILED"
        }
      )
    )
  })

  it('receive content should be ok 1', function () {
		expect(
			JSON.stringify( flatReducer( undefined, {type: RECEIVE_NODES_CONTENT, payload: {1:2}}))
    ).to.equal(
			JSON.stringify(
        {
          ref: null,
          content: {1: 2},
          flatIsDragable: false,
          cut: null,
          state: "ONGOING"
        }
      )
    )
  })

  it('receive content should be ok 2', function () {
		expect(
			JSON.stringify( flatReducer( {ref:null, content:{0:1}, flatIsDragable: false, cut:null, state:"ONGOING"}, {type: RECEIVE_NODES_CONTENT, payload: {1:2}}))
    ).to.equal(
			JSON.stringify(
        {
          ref: null,
          content: {0:1, 1: 2},
          flatIsDragable: false,
          cut: null,
          state: "ONGOING"
        }
      )
    )
  })



})

