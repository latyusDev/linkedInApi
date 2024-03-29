const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true,'content is required']
    },
    parent_id:{
        type:mongoose.Schema.Types.ObjectId,
       default:null
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'user id is required'],
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like',
    }]
},{
    timestamps:true
})


const Comment = mongoose.model('Comment',CommentSchema);

module.exports = Comment;