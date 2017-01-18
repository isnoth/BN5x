export function createChildNode(ref, obj, cNodeKey, nNode, callback){

  let cNode = obj[cNodeKey]

  ref.child(nNode.key).set(nNode, (err)=>{
    if(err){
      callback(err)
    }else{
      console.log("createChildNode:", cNode)
      ref.child(cNodeKey).update({children: cNode.children?[...cNode.children, nNode.key]:[nNode.key]}, (err2)=>{
        if (err2){
          callback(err2)
        }else{
          callback(null)
        }
      })
    }
  })
}
