const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const slugify = require('slugify');
const User = require("../models/userModel");
const { json } = require("body-parser");

const createProduct = asyncHandler(async (req, res, next) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const product = await Product.create(req.body)
        res.json({
            product
        })
    } catch (error) {
        throw new Error(error)
    }
})

const getProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    try {
        const prod = await Product.findById(id)
        res.json(prod)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllProduct = asyncHandler(async (req, res, next) => {
    try {
        console.log(req.query)
        const queryObj = { ...req.query }
        excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach((element) => delete queryObj[element])
        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

        let query = Product.find(JSON.parse(queryStr))

        // const prod1 = await Product.find()

        // sorting product
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        } else {
            query = query.sort('-createdAt')
        }

        // limiting fields
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            query = query.select('-__v')
        }

        // pagination
        const page = req.query.page
        const limit = req.query.limit
        const skip = (page - 1) * limit

        query = query.skip(skip).limit(limit)

        if (page) {
            const countProduct = await Product.countDocuments()
            console.log(countProduct)
            if (skip >= countProduct) {
                throw new Error('This page does not exists.')
            }
        }
        console.log('=>', page, limit, skip)
        // console.log('query => ', query)

        const prod = await query
        res.json(prod)
    } catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params
        console.log(id)
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updProduct = await Product.findByIdAndUpdate(id, {
            slug: req?.body?.slug
        },
            {
                new: true
            }
        )
        console.log(updProduct)
        res.json(updProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteProduct = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    try {
        const prod = await Product.findByIdAndDelete(id)
    } catch (error) {
        throw new Error(error)
    }
})

const addToWishlist = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    const { productId } = req.body
    try {
        const user = await User.findById(_id)
        const alreadyAdded = await user.wishlist.find((id) => id.toString() === productId)
        if (alreadyAdded) {
            let user = await User.findByIdAndUpdate(_id, {
                $pull: {
                    wishlist: productId
                }
            },
                {
                    new: true
                }
            )
            res.json(user)
        } else {
            let user = await User.findByIdAndUpdate(_id, {
                $push: {
                    wishlist: productId
                }
            },
                {
                    new: true
                }
            )
            res.json(user)
        }
    } catch (error) {
        throw new Error(error)
    }
})

const rating = asyncHandler(async (req, res, next) => {
    const { _id } = req.user
    const { star, comment, productId } = req.body
    try {
        const product = await Product.findById(productId)
        let alreadyRated = await product.ratings.find(
            (userId) => userId.postedby.toString() === _id.toString()
        )
        if (alreadyRated) {
            const updateRating = await Product.updateOne(
                {
                    ratings: {
                        $elemMatch: alreadyRated
                    }
                },
                {
                    $set: {
                        "ratings.$.star": star,
                        "ratings.$.comment": comment,
                    }
                },
                {
                    new: true
                }
            )
            // res.json(updateRating)
        } else {
            const ratingProduct = await Product.findByIdAndUpdate(productId, {
                $push: {
                    ratings: {
                        star: star,
                        comment: comment,
                        postedby: _id
                    }
                }
            },
                {
                    new: true
                }
            )
            // res.json(ratingProduct)
        }
        let getAllRatings = await Product.findById(productId)
        let totalR = getAllRatings.ratings.length
        let ratingSum = getAllRatings.ratings
            .map((item) => item.star)
            .reduce((prev, curr) => (prev + curr), 0)
        let actualRating = Math.round(ratingSum / totalR)
        let finalProduct = await Product.findByIdAndUpdate(productId, {
            totalRating: actualRating
        }, {
            new: true
        })
        res.json(finalProduct)
    } catch (error) {
        throw new Error(error)
    }
})

const uploadImages = asyncHandler(async (req, res, next) => {
    console.log(req.files)
})

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    addToWishlist,
    rating,
    uploadImages
}
