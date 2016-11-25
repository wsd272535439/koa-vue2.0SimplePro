/**
 * Created by hwh on 16/11/11.
 */
var Models = require('../lib/core');
var $User = Models.$User;

exports.get = function * (){

    var data = this.request.query;

};

exports.post = function * (){
    var data = this.request.body;
    //this.body = {
    //    code:0,
    //    name:'hwh',
    //    message:'成功'
    //}
    var userExist = yield $User.getUserByUid(data.uid);
    console.log(userExist)
    if(userExist){
        this.body = {
            code:0,
            message:'获取用户信息成功',
            result:userExist
        }
    }else{
        this.body = {
            code:10000,
            error:'用户不存在'
        }
    }
}