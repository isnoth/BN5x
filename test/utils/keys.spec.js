import jsdom from 'jsdom';
import { JSDOM } from 'jsdom';
import { bindKeys } from "../../src/utils/keys"

const dom = new JSDOM('<html></html>')
const { window } = dom;
const { document } = window

function createKeyboardEvent(type, keyCode){
  return new window.KeyboardEvent(type, {key: keyCode, char: "z", keyCode: 90});
}

function createKeydownEvent(keyCode){
  return createKeyboardEvent('keydown', keyCode)
}

describe('#bindKeys()', ()=>{
  it('should be ok', ()=>{
    bindKeys({
      el: document.body,
      keyList: [{
        keys: 'delete',
        fn: function(){console.log('delete')}
      },]
    });

    const event = createKeydownEvent('z')
    document.body.dispatchEvent(event);
  }) 
})
