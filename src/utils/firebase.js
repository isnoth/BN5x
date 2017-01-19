import { getParent } from "utils/node2"

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
