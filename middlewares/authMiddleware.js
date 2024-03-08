const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt;
const JWTStrategy = require('passport-jwt').Strategy;
require('dotenv').config;
passport.use(
    new JWTStrategy(
        {
            secretOrKey:process.env.JWT_SECRET,
            // jwtFromRequest:ExtractJWT.fromUrlQueryParameter('secret_token')
            jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken()
        },
        async(token,done)=>{
            try{
                return done(null,token.user)
            }catch(error){
                return done(error)
            }
        }
    )
)

passport.use('signup',
    new localStrategy(
        {
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:true,
        },
        async(req,email,password,done)=>{
            const {first_name,last_name,country,state,city,street} = req.body
            try{
                const registeredUser  = await User.findOne({email});
                if(registeredUser){
                    // res.status(422).json({message:'user already registered'});
                    return new Error('user already registered')
                }
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password,salt)
                const userDetails = {first_name,last_name,email,password:hashedPassword}
                // userDetails.password = hashedPassword;
                const user = await User.create(userDetails);
                console.log('here',user)
                return done(null,user);
            }catch(e){
                 done(e)
            }
        }
    )
)

passport.use(
    'login',
   new localStrategy(
    {
        usernameField:'email',
        passwordField:'password',
    },
    async(email,password,done)=>{
        try{
            const user = await User.findOne({email});
            console.log(password)
            const compare =  await bcrypt.compare(password,user.password);
            if(!user||!compare){
                return done(null,false,{message:'user not found'});
            }
            console.log(user,'here')
            return done(null,user,{message:'You are logged in'});
        }catch(e){
           return done(e);
        }
    }
    
    )
)

module.exports = passport