const express = require('express')
const { createCategory, getAllCategory, getCategory, updateCategory, deleteCategory } = require('../controller/categoryController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCategory)
router.get('/', getAllCategory)

router.put('/:id', authMiddleware, isAdmin, updateCategory)
router.delete('/:id', authMiddleware, isAdmin, deleteCategory)
router.get('/:id', authMiddleware, isAdmin, getCategory)

module.exports = router
