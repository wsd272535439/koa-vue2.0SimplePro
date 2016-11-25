/**
 * Created by hwh on 16/10/21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    topicId:{type:ObjectId,required:true},
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    content:{type:String,required:true},
    created_at:{type:Date,default:Date.now()},
    updated_at:{type:Date,default:Date.now()}
})

CommentSchema.index({topic_id:1,updated_at:1});

module.exports = mongoose.model('Comment',CommentSchema);
