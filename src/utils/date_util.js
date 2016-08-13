/*
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
*/

export class myDate extends Date{
  constructor(date){
		super();
    this.date = date
  }

  Format(fmt){
    var o = {
        "M+": this.date.getMonth() + 1, //月份 
        "d+": this.date.getDate(), //日 
        "h+": this.date.getHours(), //小时 
        "m+": this.date.getMinutes(), //分 
        "s+": this.date.getSeconds(), //秒 
        "q+": Math.floor((this.date.getMonth() + 3) / 3), //季度 
        "S": this.date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;


  }

}

//module.exports.Date = Date

export function getTimeStampHour(hour){
  const today = new myDate(new Date())
  console.log(today.Format("yyyy-MM-dd"))
  //const today0am = new myDate(new myDate.Format("yyyy-MM-dd")).getTime()
  //return today0am
}


export function today0am(){
  const now = new Date().getTime()
  console.log(now)
  return new Date((now-now%(1000*60*60*24)))
}

export function todayXhour(x){
  const start = today0am().getTime()
  return new Date(start+(x*1000*60*60))
}


