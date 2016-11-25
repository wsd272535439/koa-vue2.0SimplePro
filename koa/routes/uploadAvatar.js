/**
 * Created by hwh on 16/11/12.
 */
var bodyParse = require('co-busboy');
var multiparty = require('multiparty');
var fs = require('fs');
var path = require('path');
var Models = require('../lib/core');
var $User = Models.$User;

exports.post = function *(){
    var parts = bodyParse(this.request)
    console.log(parts)
    //if (!uid){
    //    this.body = {
    //        code:10000,
    //        error:'uid未上传'
    //    }
    //    return
    //}
    //console.log('body',yield parts);
    var part
    var fileNames = []
    var uid
    while (part = yield parts){

        if (part.pipe){
            console.log('part',part);
            var filename = part.filename
            fileNames.push(filename)
            console.log('upload',filename)
            var homeDir = path.resolve(__dirname, '..')

            var newpath = homeDir + '/theme/'+ filename;
            var stream = fs.createWriteStream(newpath);
            part.pipe(stream);
        }else{
            uid = part[1]
        }

        //var files = part.pipe()
        //var stream = fs.createWriteStream(path.join('../theme',parseInt(Math.random()*100) + Date.parse(new Date()).toString() + ext));
        //console.log('www.baidu',stream)
    }
    if (!uid){
        this.body = {
            code:10000,
            error:'请传入正确的参数'
        }
        return
    }
    if(fileNames.length > 0){
        var imgUrl;
        for (var item of fileNames){
            imgUrl = 'http://localhost:3000/' + item
        }
        var userExsit = yield $User.setUserAvatarByUid(uid,imgUrl)
        //var newUser = $User.getUserByUid(uid)
        console.log('usersss',userExsit)
        if (userExsit){
            this.body = {
                code:0,
                message:'上传成功',
                result:{
                    url:imgUrl
                }
            }
        }else{
            this.body = {
                code:10000,
                message:'上传失败'
            }
        }
    }
}
