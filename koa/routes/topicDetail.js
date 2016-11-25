/**
 * Created by hwh on 16/11/17.
 */
var Models = require('../lib/core');
var $Topic = Models.$Topic;
var $Comment = Models.$Comment;
var $User = Models.$User;

exports.get = function * (){
  this.body = 'hello'
}

exports.post = function * (){
  var data = this.request.body;
  console.log('data', data);
  if(data && data.topicId){
    var topic = yield $Topic.getTopicById(data.topicId)
    var comment = yield $Comment.getCommentsByTopicIdAndUid(data.topicId,data.uid)
    var comments = yield $Comment.getCommentsByTopicId(data.topicId)
    console.log('comment',comment)
    this.body = {
      code: 0,
      message: '处理成功',
      result: {
        topic:topic,
        isComment:comment.length > 0 ? 1 : 0,
        comments:comments
      }
    }
  }
}