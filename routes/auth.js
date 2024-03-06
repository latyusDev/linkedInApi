const express = require('express');
const { register, login } = require('../controllers/authController');
const authRoutes = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('../middlewares/authMiddleware')

authRoutes.post('/signup',passport.authenticate('signup',{session:false}),register);
authRoutes.post('/login',login);
// authRoutes.post('/signin',passport.authenticate('login'),login);

module.exports = authRoutes;