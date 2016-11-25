/**
 * Created by hwh on 16/11/14.
 */
var Models = require('../lib/core');
var $Topic = Models.$Topic;

exports.post = function * (){
  var data = this.request.body;
  //this.body = {
  //    code:0,
  //    name:'hwh',
  //    message:'成功'
  //}
  if (data.tab === '全部') {
    data.tab = undefined
  }
  var topics = yield $Topic.getTopicsByTab(data.tab,data.page)
  var count = yield $Topic.getTopicsCount(data.tab)
  console.log('topics',topics)
  if(topics && topics.length > 0){
    this.body = {
      code:0,
      message:'获取用户信息成功',
      result:{
        topics:topics,
        topicCount:count
      }
    }
  }else{
    this.body = {
      code:0,
      message:'没有相关主题',
      result:{
        topics:topics,
        topicCount:undefined
      }
    }
  }
}