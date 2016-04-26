
import {expect} from 'chai';
import assert from "assert"
import {mapTolist} from "../src/components/stat/stat_util"
import {toListHome} from "../src/components/stat/stat_util"
import {toListWork} from "../src/components/stat/stat_util"
//import {stat} from "../src/components/stat/stat_util"
//console.log(mapTolist)
//console.log(stat)

describe.skip('TestStat', function () {
  it('getRoot() get root should return ok', function () {
    const l =  [
                 { qid:"-KFM_tNY16wr-kcvNos2",
                   date: 1460699881380 
                 }
               ]
    console.log(mapTolist(l))
  })
})


describe('Array', function() {
  describe('#mapTolist()', function () {
    it('mapTolist should be ok', function () {

      var l = [
        { date: 1460699894230, qid: '-KFM_tNY16wr-kcvNos2', type: "work" },
        { date: 1460943215588, qid: '-KFM_tNY16wr-kcvNos2', type: "home"},
        //{ date: 1460944694716, qid: '-KFM_tNY16wr-kcvNos2' },
        //{ date: 1460946210094, qid: '-KFHXMx4sktGwM6cwNYH' },
        //{ date: 1460948682918, qid: '-KFbE14ap-fkfIwDE99q' },
        //{ date: 1460948685842, qid: '-KFbE14ap-fkfIwDE99q' },
        //{ date: 1460962017451, qid: '-KFHXMx4sktGwM6cwNYH' },
        { date: 1460964746579, qid: '-KFHXMx4sktGwM6cwNYH', type: "home" } 
      ]

      var e = [
        [1460678400000, 1],
        [1460937600000, 1],
      ]

      var out = mapTolist(l)
      //console.log(out)
      //console.log(l)
      assert.equal(out[0][0], e[0]['date']);
      assert.equal(out[0][1], e[0]['count']);

      assert.equal(out[1][0], e[1]['date']);
      assert.equal(out[1][1], e[1]['count']);
    });
    

    it('toListHome should be ok', function () {

      var l = [
        { date: 1460699894230, qid: '-KFM_tNY16wr-kcvNos2', type: "work" },
        { date: 1460699894230, qid: '-KFM_tNY16wr-kcvNos2', type: "home"},
        { date: 1460964746579, qid: '-KFHXMx4sktGwM6cwNYH', type: "home" } 
      ]

      var e2 = [
        [1460678400000, 1],
        [1460937600000, 1],
      ]

      var out = toListHome(l)
      //console.log(out)
      //console.log(l)
      assert.equal(out[0][0], e2[0]['date']);
      assert.equal(out[0][1], e2[0]['count']);

      assert.equal(out[1][0], e2[1]['date']);
      assert.equal(out[1][1], e2[1]['count']);
    });

    it('toListWork should be ok', function () {

      var l = [
        { date: 1460699894230, qid: '-KFM_tNY16wr-kcvNos2', type: "work" },
        { date: 1460699894230, qid: '-KFM_tNY16wr-kcvNos2', type: "home"},
        { date: 1460964746579, qid: '-KFHXMx4sktGwM6cwNYH', type: "home" } 
      ]

      var e1 = [
        [1460678400000, 1],
      ]

      var e2 = [
        [1460678400000, 1],
        [1460937600000, 1],
      ]

      var out = toListWork(l)
      //console.log(out)
      //console.log(l)
      assert.equal(out[0][0], e1[0]['date']);
      assert.equal(out[0][1], e1[0]['count']);
    });


  });
});
