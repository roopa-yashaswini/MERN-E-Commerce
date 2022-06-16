const Product = require('../models/product')
const mongoose = require('mongoose')
const User = require('../models/user')
const HttpError = require('../models/http-error');
const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');

const getProducts = async(req, res, next) => {
    const products = await Product.find({});
    res.json({
        products: products.map(p => p.toObject({getters: true}))
     })
}

const createProduct = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next (
            new HttpError('Invalid inputs', 422)
        );
    }
    // console.log(req.body);
    const {name, description, price, stock, discount, category} = req.body;
    console.log(req.file)
    const newProduct = new Product({
        name,
        description,
        price,
        stock,
        image: req.file.path,
        discount,
        category
    })

    try{
        await newProduct.save();
    }catch(err){
        console.log(err);
        const error = new HttpError('Creating product failed', 500);
        return next(error);
    }
    res.status(201).json({product: newProduct}); 
}

const updateProduct = async(req, res, next) => {
    const productId = req.params.productId;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors);
        return next (
            new HttpError('Invalid inputs', 422)
        );
    }
    // console.log(req.body);
    const {name, description, price, stock, discount, category} = req.body;
    // console.log(req.file)
    
    let product;
    try{
        product = await Product.findById(productId);
        // await newProduct.save();
    }catch(err){
        console.log(err);
        const error = new HttpError('Searching product failed', 500);
        return next(error);
    }

    if(!product){
        console.log(err);
        const error = new HttpError('Product not found', 500);
        return next(error);
    }

    product.name = name;
    product.description = description;
    product.stock = stock;
    product.discount = discount;
    product.price = price;
    product.catgeory = category;
    product.image = req.file.path;

    try{
        await product.save();
    }catch(err){
        console.log(err);
        const error = new HttpError('Updating product failed', 500);
        return next(error);
    }

    res.status(201).json({product: product}); 
}

const deleteProduct = async(req, res, next) => {
    const productId = req.params.productId;

    let product;
    try{
        product = await Product.findById(productId);
    }catch(err){
        console.log(err);
        const error = new HttpError('Searching product failed', 500);
        return next(error);
    }

    if(!product){
        console.log(err);
        const error = new HttpError('Product not found', 500);
        return next(error);
    }

    try{
        await product.remove();
    }catch(err){
        console.log(err);
        const error = new HttpError('Deleting product failed', 500);
        return next(error);
    }

    return res.status(201).json({message: 'Product deleted'})
}

const filterProducts = async(req, res, next) => {
    const productName = req.params.productName;

    let products;
    console.log(productName)
    try{
        products = await Product.find({name: { $regex: productName, $options: "i" }});
    }catch(err){
        console.log(err);
        const error = new HttpError('Creating product failed', 500);
        return next(error);
    }

    if(products){
        console.log(products);
    }

    return res.status(201).json({products: products})
}

const addProductToWishlist = async(req, res, next) => {
    const {productId, userId} = req.body;
    console.log(productId)
    console.log(userId)
    let user, product;
    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }
    

    if(!user){
        const error = new HttpError('User not found', 500);
        return next(error);
    }

    try{
        product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Search product failed', 500);
        return next(error);
    }

    if(!product){
        const error = new HttpError('Product not found', 500);
        return next(error);
    }    

    try{
        user.wishlistItems.push(product);
        await user.save()
    }catch(err){
        console.log(err);
        const error = new HttpError('Product not added to wishlist', 500);
        return next(error);
    }
    res.status(200).json({message: 'added to wishlist'});
}

const getWishlistItems = async(req, res, next) => {
    const {userId} = req.body;

    let user, product;
    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('User not found', 500);
        return next(error);
    }

    const wishlist = user.wishlistItems;
    const records = await Product.find({ '_id': { $in: wishlist } });
    // console.log(records);
    res.status(201).json({records: records});
}

const deleteProductFromWishlist = async(req, res, next) => {
    const {productId, userId} = req.body;
    let user, product;

    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('User not found', 500);
        return next(error);
    }

    try{
        product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Search product failed', 500);
        return next(error);
    }

    if(!product){
        const error = new HttpError('Product not found', 500);
        return next(error);
    }

    try{
        user.wishlistItems.pull(product);
        await user.save();
    }catch(err){
        console.log(err);
        const error = new HttpError('Product not added to cart', 500);
        return next(error);
    }
    
    res.status(200).json({message: 'deleted from wishlist'});
}

const addProductToCart = async(req, res, next) => {
    const {productId, userId} = req.body;
    let user, product;

    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }
    

    if(!user){
        const error = new HttpError('User not found', 500);
        return next(error);
    }

    try{
        product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Search product failed', 500);
        return next(error);
    }

    if(!product){
        const error = new HttpError('Product not found', 500);
        return next(error);
    }    

    try{
        user.cartItems.push(product);
        user.wishlistItems.pull(product);
        await user.save()
    }catch(err){
        console.log(err);
        const error = new HttpError('Product not added to cart', 500);
        return next(error);
    }

    res.status(200).json({message: 'added to cart'});
}

const getCartItems = async(req, res, next) => {
    const {userId} = req.body;

    let user;
    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('User not found', 500);
        return next(error);
    }

    const cart = user.cartItems;
    const records = await Product.find({ '_id': { $in: cart } });
    // console.log(records);
    res.status(201).json({records: records});
}

const deleteProductFromCart = async(req, res, next) => {
    const {productId, userId} = req.body;
    let user, product;

    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('User not found', 500);
        return next(error);
    }

    try{
        product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Search product failed', 500);
        return next(error);
    }

    if(!product){
        const error = new HttpError('Product not found', 500);
        return next(error);
    }

    try{
        user.cartItems.pull(product);
        await user.save();
    }catch(err){
        console.log(err);
        const error = new HttpError('Product not added to cart', 500);
        return next(error);
    }
    
    res.status(200).json({message: 'deleted from cart'});
}

const moveToWishlist = async(req, res, next) => {
    const {productId, userId} = req.body;
    let user, product;

    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('User not found', 500);
        return next(error);
    }

    try{
        product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Search product failed', 500);
        return next(error);
    }

    if(!product){
        const error = new HttpError('Product not found', 500);
        return next(error);
    }

    try{
        user.cartItems.pull(product);
        user.wishlistItems.push(product);
        await user.save();
    }catch(err){
        console.log(err);
        const error = new HttpError('Product not added to cart', 500);
        return next(error);
    }
    
    res.status(200).json({message: 'moved from cart to wishlist'});
}

const makeOrder = async(req, res, next) => {
    const {productId, userId, quantity} = req.body;
    let user, product;

    try{
        user = await User.findById(userId);
    }catch(err){
        const error = new HttpError('Search user failed', 500);
        return next(error);
    }

    if(!user){
        const error = new HttpError('User not found', 500);
        return next(error);
    }

    try{
        product = await Product.findById(productId);
    }catch(err){
        const error = new HttpError('Search product failed', 500);
        return next(error);
    }

    if(!product){
        const error = new HttpError('Product not found', 500);
        return next(error);
    }
    const order = {
        orderId: Math.random().toString(36).slice(2),
        item: product,
        date: new Date(),
        amount: product.price * quantity,
        quantity: quantity
    }

    try{
        let initialStock = product.stock;

        const sess = await mongoose.startSession();
        sess.startTransaction();
        user.cartItems.pull(product);
        user.orders.push(order);
        await user.save({session: sess});
        product.stock = initialStock - quantity;
        await product.save({session: sess});
        await sess.commitTransaction();
    }catch(err){
        console.log(err);
        const error = new HttpError('Product not added to cart', 500);
        return next(error);
    }
    
    res.status(200).json({order: order,message: 'order placed'});
}

const getProductById = async(req, res, next) => {
    const productId = req.params.productId;
    let product;
    try{
        product = await Product.findById(productId);
    }catch(err){
        console.log(err);
        const error = new HttpError('Error in searching product', 500);
        return next(error);
    }

    if(!product){
        const error = new HttpError('Product not found', 500);
        return next(error);
    }

    return res.status(201).json({product: product});
}


exports.getProducts = getProducts
exports.createProduct = createProduct
exports.updateProduct = updateProduct
exports.deleteProduct = deleteProduct
exports.addProductToWishlist = addProductToWishlist
exports.deleteProductFromWishlist = deleteProductFromWishlist
exports.getWishlistItems = getWishlistItems
exports.addProductToCart = addProductToCart
exports.getCartItems = getCartItems
exports.deleteProductFromCart = deleteProductFromCart
exports.moveToWishlist = moveToWishlist
exports.makeOrder = makeOrder
exports.getProductById = getProductById
exports.filterProducts = filterProducts