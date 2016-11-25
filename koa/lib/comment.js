/**
 * Created by hwh on 16/10/21.
 */
var Comment = require('../models').Comment;

//添加一条评论
exports.addComment = function(data){
    return Comment.create(data);
}

//根据话题ID获取对应评论
exports.getCommentsByTopicId = function(id){
    return Comment.find({topicId:id}).sort('updated_at').populate('user').exec();
}

//根据评论ID获取评论

//根据话题ID和UID获取评论
exports.getCommentsByTopicIdAndUid = function(topicId,uid){
  //var docs = Comment.find({topicId:topicId}).populate('user').exec()
  var cond = {
    $and: [
      {topicId:topicId},
      {'user.uid':uid}
    ]
  }
  //return docs.find(cond).exec()

  return Comment.find({topicId:topicId}).populate({path:'user',match:{uid:uid}}).exec()
}