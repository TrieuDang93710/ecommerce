const express = require('express')
const router = express.Router()
const { createUser, loginUser, getAllUser, getAUser, deleteUser, updateUser, blockedUser, unBlockedUser, handleRefreshToken, logout } = require('../controller/userController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/get-users', getAllUser)
router.get('/refresh', handleRefreshToken)
router.get('/logout', logout)

router.get('/:id', authMiddleware, isAdmin, getAUser)
router.delete('/:id', deleteUser)
router.put('/:id/edit-user', authMiddleware, isAdmin, updateUser)
router.put('/:id/block-user', authMiddleware, isAdmin, blockedUser)
router.put('/:id/un-block-user', authMiddleware, isAdmin, unBlockedUser)

module.exports = router