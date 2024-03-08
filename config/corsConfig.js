require('dotenv').config();

const corsOptions = {
    origin:'http://localhost:3000',
    allowedMethods:['POST','GET','PUT','PATCH'],
    credential:true,
    optionsSuccessStatus:200,
    preflightContinue:false

}

module.exports = corsOptions