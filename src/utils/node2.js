export function getChildren(key, obj){
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
  return content[cNodeKey].children.map(function(i){
    return {i: i, x: 5, y:5, w:5, h:5}
  })
}
