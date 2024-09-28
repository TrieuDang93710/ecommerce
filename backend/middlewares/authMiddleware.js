const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
        try {
            if (token) {
                const decode = jwt.verify(token, process.env.JWT_SECRET)
                // console.log(decode)
                const user = await User.findById(decode?.id)
                // console.log(user)
                req.user = user
                next()
            }
        } catch (error) {
            throw new Error('Not authored token expire. Please login again.')
        }
    } else {
        throw new Error('There is no token attached to header.')
    }
})

const isAdmin = asyncHandler(async (req, res, next) => {
    const {email} = req.params
    const userAdmin = await User.findOne(email)
    if (userAdmin.role !== 'admin') {
        throw new Error('You are not an Admin.')
    }
    else{
        next()
    }
})

module.exports = {authMiddleware, isAdmin}