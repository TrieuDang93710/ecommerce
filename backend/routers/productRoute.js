const express = require('express')
const {
    createProduct,
    getProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    addToWishlist,
    rating,
    uploadImages
} = require('../controller/productController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')
const { uploadPhoto, productImageResize } = require('../middlewares/uploadImages')

const router = express.Router()

router.post('/', authMiddleware, isAdmin, createProduct)
router.put('/upload/:id', authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImageResize, uploadImages)
router.get('/:id', getProduct)
router.put('/wishlist', authMiddleware, isAdmin, addToWishlist)
router.put('/rating', authMiddleware, isAdmin, rating)
router.put('/:id', authMiddleware, isAdmin, updateProduct)
router.delete('/:id', authMiddleware, isAdmin, deleteProduct)
router.get('/', getAllProduct)

module.exports = router