const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next (
            new HttpError('Invalid inputs', 422)
        );
    }
    const {firstName, lastName, gender, mobile, email, password} = req.body;
    let user;

    try{
        user = await User.findOne().or([{email: email}, {mobile: mobile}]);
    }catch(err){
        const error = new HttpError('Creating user failed', 500);
        return next(error);
    }

    if(user){
        const error = new HttpError('Email already present or Mobile number already exists', 422);
        return next(error);
    }
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password, 12);
    }catch(err){
        const error = new HttpError('Error hashing password', 422);
        return next(error);
    }
    
    console.log(firstName)
    console.log(lastName)
    const newUser = new User({
        firstName,
        lastName,
        gender,
        mobile,
        email,
        password: hashedPassword,
        wishlistItems: [],
        cartItems: [],
        orders: []
    });

    console.log(newUser);

    try{
        await newUser.save();
    }catch(err){
        const error = new HttpError('error creating user', 500);
        return next(error);
    }

    let token;
    try{
        token = jwt.sign({
            userId: newUser.id,
            email: newUser.email
        }, 'supersecret', {
            expiresIn: '1h'
        })
    }catch(err){
        const error = new HttpError('error creating token', 500);
        return next(error);
    }
    

    res.status(201).json({user: newUser.toObject({getters: true}), token: token});
}


const login = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next (
            new HttpError('Invalid inputs', 422)
        );
    }
    const {mobile, email, password} = req.body;

    let user;

    try{
        user = await User.findOne().or([{email: email}, {mobile: mobile}]).populate('wishlistItems').populate('cartItems').populate('orders.item');
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('Email or Mobile number does not exist', 422);
        return next(error);
    }
    // console.log(user);
    let checkPassword = false;
    try{
        checkPassword = await bcrypt.compare(password, user.password);
    }catch(err){
        const error = new HttpError('Error checking password', 422);
        return next(error);
    }

    if(!checkPassword){
        const error = new HttpError('Incorrect password', 422);
        return next(error);
    }
    console.log(user);
    let token;
    try{
        token = jwt.sign({
            userId: user.id,
            email: user.email
        }, 'supersecret', {
            expiresIn: '1h'
        })
    }catch(err){
        const error = new HttpError('error logging in', 500);
        return next(error);
    }
    
    res.status(201).json({user: user.toObject({getters: true}), token: token});
}

exports.signup = signup;
exports.login = login;