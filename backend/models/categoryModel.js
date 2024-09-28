const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        index: true
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
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Category', categorySchema)