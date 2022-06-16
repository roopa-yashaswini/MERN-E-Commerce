const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: Array,
    }
})



module.exports = mongoose.model('Product', productSchema);