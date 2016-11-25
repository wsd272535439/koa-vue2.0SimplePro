/**
 * Created by hwh on 16/11/14.
 */
var Models = require('../lib/core');
var $Topic = Models.$Topic;
var $User = Models.$User
exports.post = function * (){
  var data = this.request.body;
  console.log('data', data);
  var user = yield $User.getUserByUid(data.uid)
  if(data && user){
    data.user = user._id
    var topic = yield $Topic.addTopic(data)
    //var topicL = yield $Topic.getTopicById(topic._id)
    this.body = {
      code: 0,
      message: '发布成功',
      result: {
        topic:topic.id
      }
    }
  }
}