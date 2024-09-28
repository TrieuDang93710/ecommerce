const Category = require("../models/categoryModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const { validateMongoDbId } = require("../utils/validateMongodbId");
const User = require("../models/userModel");

const createCategory = asyncHandler(async (req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    const newCategory = await Category.create(req.body)
    res.json(newCategory)
})

const updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updateCategory = await Category.findByIdAndUpdate(id,
            {
                title: req?.body?.title,
                slug: req?.body?.slug,
                description: req?.body?.description
            },
            {
                new: true
            })
        res.json(updateCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deleteCategory = await Category.findByIdAndDelete(id)
        res.json(deleteCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getACategory = await Category.findById(id)
        res.json(getACategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllCategory = asyncHandler(async (req, res, next) => {
    try {
        const getAllACategory = await Category.find()
        res.json(getAllACategory)
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory}
