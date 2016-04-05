  export class Node{
    constructor(lNodes){
      this._lNodes = lNodes
    }

    root(){
      console.log(this._lNodes)
      var root = this._lNodes.filter(function(itm){
        return itm.id == 'root'
      })
      //console.log(root)
      if (root.length == 0){
        return null
      }else{
        return root[0]
      }
    }

    getbyName(idName){
      var fnd = this._lNodes.filter(function(itm){
        return itm.id == idName
      })
      //console.log(root)
      if (fnd.length == 0){
        return null
      }else{
        return fnd[0]
      }
    }

    getChildren(node, l_vm){
      if(!node.children){
        return []
      }else{
        node.children.map(function(cid){
          cid.find()
        })
      }
    }
  }
