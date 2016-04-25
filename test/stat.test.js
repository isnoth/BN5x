
import {expect} from 'chai';
import {mapTolist} from "../src/components/stat/stat_util"
//import {stat} from "../src/components/stat/stat_util"
console.log(mapTolist)
//console.log(stat)

describe('TestStat', function () {
  it('getRoot() get root should return ok', function () {
    const l =  [
                 { qid:"-KFM_tNY16wr-kcvNos2",
                   date: 1460699881380 
                 }
               ]
    console.log(mapTolist(l))
  })



})
