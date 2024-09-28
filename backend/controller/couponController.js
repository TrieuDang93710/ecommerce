const Coupon = require("../models/couponModel");
const { validateMongoDbId } = require("../utils/validateMongodbId");
const asyncHandler = require('express-async-handler')

const createCoupon = asyncHandler(async (req, res, next) => {
    try {
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const updateCoupon = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.json(updateCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCoupon = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateCoupon = await Coupon.findByIdAndDelete(id)
        res.json(updateCoupon)
    } catch (error) {
        throw new Error(error)
    }
})

const getACoupon = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const coupon = await Coupon.findById(id)
        res.json(coupon)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCoupon = asyncHandler(async (req, res, next) => {
    try {
        const coupons = await Coupon.find()
        res.json(coupons)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = { createCoupon, getACoupon, getAllCoupon, updateCoupon, deleteCoupon }