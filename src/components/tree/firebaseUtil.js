import {Node} from "./node"

export function getVal(ref, cb){
  return new Promise((resolve, reject)=>{
    ref.once("value", function(snap){
      resolve(snap.val())
    })
  })
}
  
  
export function toList(value){
  return new Promise((resolve, reject)=>{
    resolve(
      Object.keys(value).map(
        function(key){
          return Object.assign(
            {}, 
            value[key],
            {key: key}
          )
        }
      )
    )
  })
}
  
export function paste(cid, nid, list, ref){
  return new Promise((resolve, reject)=>{
  
    //console.log('---')
    //console.log("list: " ,list)
    var node = new Node(list)
    //console.log('--1')
    //console.log(node._lNodes)
    const newparent = node.getParent(nid)
    //console.log('--2')
    //console.log("node:", node._lNodes.map(function(i){return i.content + "_"+i.key}))
    //console.log("newparent:", newparent, tree.currentFocus)
  
    //cut
    const currentparent = node.getParent(cid)
    var currentchildren = currentparent.children 
    console.log("currentchildren before:", currentchildren)
    currentchildren.splice(currentchildren.indexOf(cid),1)
    console.log("currentchildren after:", currentchildren)
  
    //paste
    let newchildren = newparent.children 
    console.log("newchildren before:", newchildren)
    var index = newchildren.indexOf(nid)+1
    console.log("index: ", index)
    var _index =-( newchildren.length - index)
    console.log("_index: ", _index)


    if ((index == newchildren.length) || (newchildren.length == 1)){
      newchildren = [...newchildren, cid]
    }else{
      newchildren = [...newchildren.slice(0,index), cid, ...newchildren.slice(_index)]
    }



    console.log("newchildren after:", newchildren)
  
    if (newparent.id != currentparent.id){
      ref.child(currentparent.id).update({
        children: currentchildren
      })
    }
  
    ref.child(newparent.id).update({
      children: newchildren
    }, function(){
      //console.log("update")
      resolve()
    })
  
    //resolve()
  })
}


