const express = require('express');
const app = express();
require('dotenv').config();
const passport = require('./middlewares/authMiddleware');
const {connectMongoose} = require('./db');
const authRoutes = require('./routes/auth');
const commentRoute = require('./routes/comment');
const postRoutes = require('./routes/post');

const PORT = process.env.PORT
connectMongoose();
app.use(express.json());

app.use('/',authRoutes);
app.use('/posts',passport.authenticate('jwt',{session:false}),postRoutes);
app.use('/posts/comment',passport.authenticate('jwt',{session:false}),commentRoute);
app.listen(PORT,()=>console.log('app is running on port '+PORT));