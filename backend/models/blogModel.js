const mongoose = require('mongoose')

var blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    numViews: {
        type: Number,
        default: 0
    },
    isLiked: {
        type: Boolean,
        default: false
    },
    isDisLiked: {
        type: Boolean,
        default: false
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    disLikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    image: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: 'Admin'
    }
},
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
)

module.exports = mongoose.model('Blog', blogSchema)