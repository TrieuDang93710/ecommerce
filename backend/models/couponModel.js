const mongoose = require('mongoose')

const couponSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        uppercase: true
    },
    expiry: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
})


module.exports = mongoose.model('Coupon', couponSchema)