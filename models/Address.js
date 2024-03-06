const mongoose = require('mongoose');

const Address = new mongoose.Schema({
    country:{
        type:String,
        required:[true,'country is required']
    },
    state:{
        type:String,
        required:[true,'state is required']
    },
    city:{
        type:String,
        required:[true,'city is required']
    },
    street:{
        type:String,
        required:[true,'street is required']
    }
})

module.exports = Address;