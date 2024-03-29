const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content:{
        type:String,
        required:[true,'content is required']
    },
    fileUrl:{
        type:String,
        required:[true,'image url is required']
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like',
    }]
    
},{
    timestamps:true
})                                       


const Post = mongoose.model('Post',PostSchema);
module.exports = Post