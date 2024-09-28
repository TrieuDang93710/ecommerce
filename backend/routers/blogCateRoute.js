const express = require('express')
const { createBlogCategory, getAllBlogCategory, getBlogCategory, updateBlogCategory, deleteBlogCategory } = require('../controller/blogCateController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createBlogCategory)
router.get('/', getAllBlogCategory)

router.put('/:id', authMiddleware, isAdmin, updateBlogCategory)
router.delete('/:id', authMiddleware, isAdmin, deleteBlogCategory)
router.get('/:id', authMiddleware, isAdmin, getBlogCategory)

module.exports = router
