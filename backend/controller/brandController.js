const Brand = require("../models/brandModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createBrand = asyncHandler(async (req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    const newBrand = await Brand.create(req.body)
    res.json(newBrand)
})

const updateBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updateBrand = await Brand.findByIdAndUpdate(id,
            {
                title: req?.body?.title,
                slug: req?.body?.slug,
                description: req?.body?.description
            },
            {
                new: true
            })
        res.json(updateBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deleteBrand = await Brand.findByIdAndDelete(id)
        res.json(deleteBrand)
    } catch (error) {
        throw new Error(error)
    }
})

const getBrand = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getABrand = await Brand.findById(id)
        res.json(getABrand)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBrand = asyncHandler(async (req, res, next) => {
    try {
        const getAllABrand = await Brand.find()
        res.json(getAllABrand)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createBrand, getAllBrand, getBrand, updateBrand, deleteBrand }
