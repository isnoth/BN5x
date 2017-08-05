



export let bindKeys = ({el, keyList})=>{
  el.addEventListener("keydown", onKeyDown);

  function onKeyDown(event){
		console.log(event, event.key);
    const keyName = event.key;
    keyList.forEach(i=>{
      if (keyName === i['keys']){
        i.fn()
      }
    })
  }



}
