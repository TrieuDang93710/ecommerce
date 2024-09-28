const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require('express-async-handler');
const { validateMongoDbId } = require("../utils/validateMongodbId");

const createBlog = asyncHandler(async (req, res, next) => {
    try {
        const newBlog = await Blog.create(req.body)
        res.json(newBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllBlog = asyncHandler(async (req, res, next) => {
    try {
        const blogs = await Blog.find()
            .populate('likes')
            .populate('disLikes')
        res.json(blogs)
    } catch (error) {
        throw new Error(error)
    }
})

const updateBlog = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true
        })
        res.json(updateBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const getBlog = await Blog.findById(id)
            .populate('likes')
            .populate('disLikes')

        await Blog.findByIdAndUpdate(id, {
            $inc: {
                numViews: 1
            }
        },
            {
                new: true
            }
        )
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id)
        res.json(deleteBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const likeTheBlog = asyncHandler(async (req, res, next) => {
    const { blogId } = req.body
    validateMongoDbId(blogId)

    const blog = await Blog.findById(blogId)
    const loginUserId = req?.user?._id
    const isLiked = blog?.isLiked

    const alreadyDisliked = blog?.disLikes?.find(
        (userId) => userId.toString() === loginUserId.toString()
    )
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: loginUserId },
            isDisLiked: false
        },
            {
                new: true
            },)
        res.json(blog)
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        },
            {
                new: true
            },)
        res.json(blog)
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { likes: loginUserId },
            isLiked: true
        },
            {
                new: true
            },)
        res.json(blog)
    }
})

const dislikeTheBlog = asyncHandler(async (req, res, next) => {
    const { blogId } = req.body
    validateMongoDbId(blogId)

    const blog = await Blog.findById(blogId)
    const loginUserId = req?.user?._id
    const isDisLiked = blog?.isDisLiked

    const alreadyLiked = blog?.likes?.find(
        (userId) => userId.toString() === loginUserId.toString()
    )
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { likes: loginUserId },
            isLiked: false
        },
            {
                new: true
            },)
        res.json(blog)
    }
    if (isDisLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: loginUserId },
            isDisLiked: false
        },
            {
                new: true
            },)
        res.json(blog)
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { disLikes: loginUserId },
            isDisLiked: true
        },
            {
                new: true
            },)
        res.json(blog)
    }
})

module.exports = { createBlog, updateBlog, getAllBlog, getBlog, deleteBlog, likeTheBlog, dislikeTheBlog }