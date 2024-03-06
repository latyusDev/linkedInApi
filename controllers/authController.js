const jwt = require('jsonwebtoken');
require('dotenv').config();
const passport = require('../middlewares/authMiddleware')

const register = async(req,res,next)=>{
        res.status(201).json({
            message:'user registered successfully',
            user:req.user
        });
        next();
}

const login = async(req,res,next)=>{
    passport.authenticate('login',async(err,user,info)=>{
       
        try{
            if(!user){
                const error = new Error('Invalid credentials')
                return next(error);
            }
            req.login(user,{session:false},async(error)=>{
                if(error) return next(error);
                const token = jwt.sign({user},process.env.JWT_SECRET,{expiresIn:'1d'});
                return res.json({user,token});
        
            })
            next();
        }catch(e){
            return next(e);
        }
    })(req,res,next)
}



module.exports = {register,login}