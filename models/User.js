const mongoose = require('mongoose');
const addressSchema = require('./Address')

const User = new mongoose.Schema({
    first_name:{
        type:String,
        required:[true,'first name is required']
    },
    last_name:{
        type:String,
        required:[true,'last name is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        min:6
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User',User)