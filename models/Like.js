const mongoose = require('mongoose');

const Like = new mongoose.Schema({
    comment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'user id isrequired'],
        ref:'User'
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'post id isrequired'],
        ref:'Post'
    }
},{
    timestamps:true
})


module.exports = mongoose.model('like',Like);