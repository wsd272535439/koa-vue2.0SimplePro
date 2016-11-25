/**
 * Created by hwh on 16/10/21.
 */
var User = require('../models').User
//新建一个用户
exports.addUser = function (data) {
    return User.create(data);
};

//通过id获取用户
exports.getUserById = function(id){
  return User.findbyId(id).exec();
};

//通过name获取用户
exports.getUserByName = function (name) {
    return User.findOne({name:name}).exec()
}

exports.getUserByUid = function (uid) {
    return User.findOne({uid:uid})
}

//上传图片插入model
exports.setUserAvatarByUid = function (uid,imgUrl) {
    return User.update({uid:uid},{$set:{avatar:imgUrl}})
}