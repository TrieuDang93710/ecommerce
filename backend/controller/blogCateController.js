const BlogCategory = require("../models/blogCateModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify')
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createBlogCategory = asyncHandler(async (req, res, next) => {
    if (req.body.title) {
        req.body.slug = slugify(req.body.title)
    }
    const newBlogCategory = await BlogCategory.create(req.body)
    res.json(newBlogCategory)
})

const updateBlogCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)

    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updateBlogCategory = await BlogCategory.findByIdAndUpdate(id,
            {
                title: req?.body?.title,
                slug: req?.body?.slug,
                description: req?.body?.description
            },
            {
                new: true
            })
        res.json(updateBlogCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlogCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deleteBlogCategory = await BlogCategory.findByIdAndDelete(id)
        res.json(deleteBlogCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getBlogCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getABlogCategory = await BlogCategory.findById(id)
        res.json(getABlogCategory)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlogCategory = asyncHandler(async (req, res, next) => {
    try {
        const getAllABlogCategory = await BlogCategory.find()
        res.json(getAllABlogCategory)
    } catch (error) {
        throw new Error(error)
    }
})

module.exports = { createBlogCategory, getAllBlogCategory, getBlogCategory, updateBlogCategory, deleteBlogCategory }
