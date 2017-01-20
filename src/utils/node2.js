export function getChildren(key, obj){
}

export function getParent( key, obj ){
  let fnd = Object.keys(obj).filter(i=>{
    let children = obj[i].children
    return children&&children.indexOf(key)>-1
  })

  return fnd?fnd[0]:null
}

export function getRootPath(key, obj){
  let paths = []
  let path = key
  //paths.push(path)
  while (path && path!="root"){
    path = getParent(path, obj)
    paths.push(path)
  }
  return paths.reverse()
}

export function nodeGetAllChildrenId(key, obj){
  let children = obj[key].children

  if (children){
    obj[key].children.forEach(i=>{
      children = children.concat(nodeGetAllChildrenId(i, obj))
    })
    return children
  }else{
    return []
  }
}

export function getUniqueId() {
  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  // TODO: Replace with Firebase.ServerValue.TIMESTAMP.
  // Add BN here to prevent the css selector error.
  return "BN-" + new Date().getTime().toString() + "-" + randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
}



export function initLayout(content, cNodeKey){
  if (content[cNodeKey].children){
     return content[cNodeKey].children.map((i, index)=>{
      return {i: i, x: 5*index, y:5, w:5, h:5}
    })
  }else{
    return [{i:cNodeKey, x:5, y:5, w:5, h:5}]
  }
}
