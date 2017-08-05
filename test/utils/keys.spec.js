import jsdom from 'jsdom';
import { JSDOM } from 'jsdom';
import { bindKeys } from "../../src/utils/keys"

//const dom = new JSDOM('<html></html>')
//const { window } = dom;
//const { document } = window

function createKeyboardEvent(window, type, {ctrlKey, shiftKey, key}){
  return new window.KeyboardEvent(type, {key: key, ctrlKey: ctrlKey, shiftKey:shiftKey, char: "z", keyCode: 90});
}

function createKeydownEvent(window, params){
  return createKeyboardEvent(window, 'keydown', params)
}

function getEl(){
    const dom = new JSDOM('<html></html>')
    const { window } = dom;
    const { document } = window
    return {document, window}
}


describe('#bindKeys()', ()=>{

  it('bind single delete key', (done)=>{
    const { window, document } = getEl()

    bindKeys({
      el: document.body,
      keyList: [{
        keys: {ctrlKey: false, key: 'delete'},
        fn: function(){
          done()
        }
      },]
    });

    const event = createKeydownEvent(window, {key:'delete', ctrlKey: false})
    document.body.dispatchEvent(event);
  }) 

  it('bind control+delete key', (done)=>{
    const { window, document } = getEl()
    bindKeys({
      el: document.body,
      keyList: [{
        keys: {ctrlKey: true, key: 'delete'},
        fn: function(){
          done()
        }
      },]
    });

    const event1 = createKeydownEvent(window, {key:'delete', ctrlKey: true})
    document.body.dispatchEvent(event1);
  }) 

  it('bind control+shift+delete key', (done)=>{
    const { window, document } = getEl()
    bindKeys({
      el: document.body,
      keyList: [{
        keys: {ctrlKey: true, shiftKey: true,  key: 'delete'},
        fn: function(){
          done()
        }
      },]
    });

    const event1 = createKeydownEvent(window, {key:'delete', ctrlKey: true, shiftKey: true})
    document.body.dispatchEvent(event1);
  }) 


})
