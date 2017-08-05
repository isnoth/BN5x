



export let bindKeys = ({el, keyList})=>{
  el.addEventListener("keydown", onKeyDown);

  function onKeyDown(event){
		console.log(event, event.key, event.ctrlKey);
    const keyName = event.key;
    keyList.forEach(({keys:{ctrlKey=false, shiftKey=false, key}, fn})=>{

      if ((ctrlKey === event.ctrlKey) && (shiftKey===event.shiftKey) && (key === event.key) )
        fn()

    })
  }
}
