
export class Node{
  constructor(lNodes){
    this._lNodes = lNodes
  }

  root(){
    //console.log(this._lNodes)
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

  getChildren(idName){
    
    var that = this
    if(!this.getbyName(idName)){
      return []
    }else{
      var l = []
      if (this.getbyName(idName).children == null){
        return []
      }else{
        this.getbyName(idName).children.map(function(cid){
          //console.log(cid)
          l.push(that.getbyName(cid))
        })
        return l
      }
    }
  }
}

