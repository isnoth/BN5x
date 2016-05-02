
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




