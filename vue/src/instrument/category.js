/**
 * Created by hwh on 16/11/17.
 */

Date.prototype.Format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,         //月份
    "d+" : this.getDate(),          //日
    "h+" : this.getHours(),          //小时
    "m+" : this.getMinutes(),         //分
    "s+" : this.getSeconds(),         //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds()       //毫秒
  };

  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
}

String.prototype.timeStr = function(){
  var argDate = new Date(this)
  var nowDate = new Date().getTime() / 1000
  var d = parseInt(nowDate - (argDate.getTime() / 1000))
  var d_days = parseInt(d/86400);
  var d_hours = parseInt(d/3600);
  var d_minutes = parseInt(d/60);
  if(d_days>0 && d_days<4){
    return d_days+"天前";
  }else if(d_days<=0 && d_hours>0){
    return d_hours+"小时前";
  }else if(d_hours<=0 && d_minutes>0){
    return d_minutes+"分钟前";
  }else{
    return argDate.toJSON()
  }
}

Date.prototype.timeStr = function(){
  var nowDate = new Date().getTime() / 1000
  d = parseInt(nowDate - (this.getTime() / 1000))
  d_days = parseInt(d/86400);
  d_hours = parseInt(d/3600);
  d_minutes = parseInt(d/60);
  if(d_days>0 && d_days<4){
    return d_days+"天前";
  }else if(d_days<=0 && d_hours>0){
    return d_hours+"小时前";
  }else if(d_hours<=0 && d_minutes>0){
    return d_minutes+"分钟前";
  }else{
    return this.toJSON()
  }
}