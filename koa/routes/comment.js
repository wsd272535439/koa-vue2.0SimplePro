/**
 * Created by hwh on 16/11/17.
 */
var Models = require('../lib/core');
var $Topic = Models.$Topic;
var $Comment = Models.$Comment;
var $User = Models.$User;
exports.post = function * (){
  var data = this.request.body;
  var topicId = data.topicId
  var uid = data.user.uid
  var user = yield $User.getUserByUid(uid)
  data.user = user._id
  //data.user.name = user.name
  //data.user.avatar = user.avatar
  //console.log('data',data)
  var comment = yield $Comment.getCommentsByTopicIdAndUid(topicId,uid)

  if(comment.length > 0){
    this.body = {
      code:10000,
      error:'您已经评论过该话题'
    }
    return
  }
  yield $Comment.addComment(data)
  var comments = yield $Comment.getCommentsByTopicId(data.topicId)

  if(comments.length > 0){
    $Topic.incCommentById(topicId)
    this.body = {
      code:0,
      message:'评论成功',
      result:{
        comments:comments
      }
    }
  }else{
    this.body = {
      code:10000,
      error:'评论失败'
    }
  }
}