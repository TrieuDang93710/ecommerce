const express = require('express')
const router = express.Router()
const { 
    createUser, 
    loginUser, 
    getAllUser, 
    getAUser, 
    deleteUser, 
    updateUser, 
    blockedUser, 
    unBlockedUser, 
    handleRefreshToken, 
    logout, updatePassword, 
    forgotPasswordToken,
    resetPassword
} = require('../controller/userController')
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware')

router.post('/register', createUser)
router.post('/forgot-pass', forgotPasswordToken)
router.put('/update-pass', authMiddleware, updatePassword)
router.put('/reset-pass/:token', resetPassword)

router.post('/login', loginUser)
router.get('/get-users', getAllUser)
router.get('/refresh', handleRefreshToken)

router.get('/get-a-user', authMiddleware, isAdmin,  getAUser)
router.put('/edit-user', authMiddleware, updateUser)

router.get('/logout', logout)

router.delete('/:id', deleteUser)
router.put('/block-user', authMiddleware, isAdmin, blockedUser)
router.put('/un-block-user', authMiddleware, isAdmin, unBlockedUser)

module.exports = router