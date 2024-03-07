const mongoose = require('mongoose');

const Like = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,'user id isrequired'],
        ref:'User'
    },
    object:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel',
        required:true,        
    },
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
})


module.exports = mongoose.model('Like',Like);