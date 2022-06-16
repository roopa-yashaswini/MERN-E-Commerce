const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type : String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wishlistItems: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    ],
    cartItems: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    ],
    orders: [
        {
            item: {
                type: mongoose.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
            date: {
                type: Date,
                required: true
            },
            amount: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('User', userSchema);