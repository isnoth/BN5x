import { getParent, nodeGetAllChildrenId} from "utils/node2"


export function deleteNode(ref, obj, cNodeKey, callback){

  
}

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

export function createBrotherNode(ref, obj, cNodeKey, nNode, callback){

  let cNode = obj[cNodeKey]
  let parent = getParent( cNodeKey, obj)
  if (parent){
    //create new node
    ref.child(nNode.key).set(nNode, (err)=>{
      if (err){
        callback(err)
      }else{
        console.log("createBrotherNode:", cNode)
        //update node
        let children = obj[parent].children

        console.log("children:", children)

        children?children.splice(children.indexOf(cNodeKey)+1,0,nNode.key):[nNode.key]

        console.log("children:", children)
        ref.child(parent).update({children: children}, (err2)=>{
          if (err2){
            callback(err2)
          }else{
            callback(null)
          }
        })

      }
    })
  }
}

export function pasteNode(ref, obj, cid, nid){
  return new Promise((resolve, reject)=>{
    let cNode = obj[cid]
    let nParent = getParent( nid, obj)
    let cParent = getParent( cid, obj)
    console.log(nid, cid, nParent, cParent)

    if (cParent==nParent && 
        (obj[nParent].children.indexOf(nid)-obj[nParent].children.indexOf(cid) == -1)){
      console.log("1.2 -> 1.1")
      resolve()
    }else if(nodeGetAllChildrenId(cid, obj).indexOf(nid) > -1){
      console.log('1.1 -> 1')
      resolve()
    }else{
      //cut
      let currentchildren = obj[cParent].children 
      currentchildren.splice(currentchildren.indexOf(cid),1) //!!!!

      //paste
      let newchildren = obj[nParent].children 
      let index = newchildren.indexOf(nid)+1
      let _index =-( newchildren.length - index)

      if ((index == newchildren.length) || (newchildren.length == 1)){
        newchildren = [...newchildren, cid]
      }else{
        newchildren = [...newchildren.slice(0,index), cid, ...newchildren.slice(_index)]
      }

      console.log("newchildren after:", newchildren)


      if (nParent != cParent){
        ref.child(cParent).update({
          children: currentchildren
        })
      }
  
      ref.child(nParent).update({
        children: newchildren
      }, function(){
        resolve()
      })

    }
  })

}
