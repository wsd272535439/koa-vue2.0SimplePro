/**
 * Created by hwh on 16/10/21.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    user:{ type: Schema.Types.ObjectId, ref: 'User' },
    title:{type:String,required:true},
    content:{type:String,required:true},
    tab:{type:String,required:true},
    pv:{type:Number,required:true},
    comment:{type:Number,default:0},
    created_at:{type:Date,default:Date.now()},
    updated_at:{type:Date,default:Date.now()},
});

TopicSchema.index({tab:1,updated_at:-1});
TopicSchema.index({'user.name':1,updated_at:-1});
module.exports = mongoose.model('Topic',TopicSchema);


