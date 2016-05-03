
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

  getAllChildren(idName){
    var l = []
    var that = this
    var current = this.getbyName(idName)
    l.push(current)

    if (current.children){
      current.children.map(function(childId){
        //var child = that.getbyName(childId)
        //l.push(child)
        var lChildren = that.getAllChildren(childId)
        l = l.concat(lChildren)
      })
    }

    return l
    //return [this.getbyName(idName)]
    //return [{id: "BN1"}]
  }

  //async problems?
  getParent(idName){
    var findParent = null
    this._lNodes.forEach(function(node){
      if (node.children){
        //console.log(node)
        node.children.forEach(function(child){
          //console.log(child, idName)
          if (idName == child){
            //console.log("find")
            findParent = node
          }
        })
      }
    })

    return findParent
  }

  getUniqueId() {
    function randomString(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    }
    // TODO: Replace with Firebase.ServerValue.TIMESTAMP.
    // Add BN here to prevent the css selector error.
    return "BN-" + new Date().getTime().toString() + "-" + randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  }


}




