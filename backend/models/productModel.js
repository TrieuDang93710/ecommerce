const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require('bcrypt')

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        },
        brand: {
            type: String,
            enum: ['Apple', 'Samsung', 'Lenovo']
        },
        quantity: {
            type: Number,
            required: true,
            select: false
        },
        sold: {
            type: Number,
            default: 0,
            select: false
        },
        images: {
            type: Array,
            default: []
        },
        color: {
            type: String,
            enum: ['Black', 'Brown', 'Red']
        },
        ratings: [
            {
                star: Number,
                comment: String,
                postedby: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User'
                }
            }
        ],
        totalRating: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);