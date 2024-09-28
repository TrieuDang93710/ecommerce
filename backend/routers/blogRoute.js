const express = require('express')
const router = express.Router()
const { createBlog, updateBlog, getAllBlog, getBlog, deleteBlog, likeTheBlog, dislikeTheBlog } = require('../controller/blogController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')


router.post('/', authMiddleware, isAdmin, createBlog)
router.put('/likes', authMiddleware, isAdmin, likeTheBlog)
router.put('/disLikes', authMiddleware, isAdmin, dislikeTheBlog)
router.get('/', getAllBlog)

router.put('/:id', authMiddleware, isAdmin, updateBlog)
router.get('/:id', getBlog)
router.delete('/:id',authMiddleware, isAdmin, deleteBlog)

module.exports = router
