const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.CONNECTION_URL);

const connectMongoose = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('connected')
    })
    mongoose.connection.on('error',(error)=>{
        console.log(error)
    })
    
}

module.exports = {connectMongoose};