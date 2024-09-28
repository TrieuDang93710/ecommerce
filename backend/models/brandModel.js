const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
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

module.exports = mongoose.model('Brand', brandSchema)