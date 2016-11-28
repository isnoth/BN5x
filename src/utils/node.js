
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

  //get children id and not include self
  getAllChildrenId(idName){
    var l = []
    var that = this
    var current = this.getbyName(idName)

    if (current.children){
      current.children.map(function(childId){
        var lChildren = that.getAllChildrenId(childId)
        l = l.concat(childId)
      })
    }
    return l
  }

  //async problems?
  getParent(idName){

    //console.log("getParent:", idName, this._lNodes)

    var _lWithChildren = this._lNodes.filter(function(i){
      return i.children
    })

    //console.log("_lWithChildren:", _lWithChildren)

    var _lfind = _lWithChildren.filter(function(i){
      return (i.children.indexOf(idName) >=0)
    })

    //console.log("getParent:", _lfind)
    return _lfind[0]


    /*
    this._lNodes.forEach(function(node){
      if (node.children){
        console.log(node)
        node.children.forEach(function(child){
          console.log(child, idName)
          if (idName == child){
            console.log("find")
            findParent = node
          }
        })
      }
    })

    return findParent
    */
  }

  print(buf, level, idName){
    var that = this
    //console.log(buf)

    return new Promise(function(resolve, reject){
      //console.log(buf, level, idName)
      //console.log(that)
      var thisnode = that.getbyName(idName)
      //console.log(thisnode)

      buf += thisnode.id +"\n"
      console.log('new buf: ', buf, '---')
      //console.log(thisnode.children)

      if (thisnode.children){
        //console.log("with children")
        var promiseArray = thisnode.children.map(function(i){
            return that.print(buf, level+1, i)
        })

        Promise.all(promiseArray)
        .then(function(value){
          resolve(buf)
        })
      }else{
        //console.log("without children")
        resolve(buf)
      }

    })

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


export class Panls extends Node{
  constructor(lNodes){
    super(lNodes)
  }

  getLayout(){
    return super.root().layout
  }

  editableLayout(){
    return !!super.root().editableLayout
  }

  initLayout(){
    return super.getChildren('root').map(function(i){
      return {i: i.id, x: 5, y:5, w:5, h:5}
    })

  }



}

