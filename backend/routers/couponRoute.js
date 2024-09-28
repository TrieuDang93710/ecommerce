const express = require('express')
const { createCoupon, getACoupon, getAllCoupon, updateCoupon, deleteCoupon } = require("../controller/couponController");
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router()

router.post('/', authMiddleware, isAdmin, createCoupon)
router.put('/:id', authMiddleware, isAdmin, updateCoupon)
router.delete('/:id', authMiddleware, isAdmin, deleteCoupon)
router.get('/', getAllCoupon)
router.get('/:id', authMiddleware, isAdmin, getACoupon)

module.exports = router