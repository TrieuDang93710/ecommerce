const { generateToken } = require('../config/jwToken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { validateMongoDbId } = require('../utils/validateMongodbId')
const { generateRefreshToken } = require('../config/refreshToken')
const jwt = require('jsonwebtoken')

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const findUser = await User.findOne({ email: email })
    if (!findUser) {
        const newUser = await User.create(req.body)
        res.json(newUser)
    } else {
        throw new Error('Already user exists.')
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(email, password)
    // check if user exists or not
    const findUser = await User.findOne({ email: email })
    if (findUser && await findUser.isPasswordMatched(password)) {
        const refreshToken = generateRefreshToken(findUser?._id)
        const updUser = await User.findByIdAndUpdate(
            findUser?._id,
            {
                refreshToken: refreshToken
            },
            {
                new: true
            }
        )
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        res.json({
            _id: findUser?._id,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            email: findUser?.email,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id)
        })
    } else {
        throw new Error('Invalid Credential.')
    }
})


const handleRefreshToken = asyncHandler(async (req, res, next) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error('No refresh token in cookies.')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken: refreshToken })
    if (!user) {
        throw new Error('No refresh token present in database or not match.')
    }
    jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || user.id !== decoded.id) {
            throw new Error('There is something wrong with refresh token.')
        }
        const accessToken = generateToken(user?._id)
        res.json({ accessToken })
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie?.refreshToken) throw new Error('No refresh token in cookies.')
    const refreshToken = cookie.refreshToken
    const user = await User.findOne({ refreshToken : refreshToken })
    if (!user) {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
        })
        return res.sendStatus(204)
    }
    await User.findByIdAndUpdate({refreshToken: ''})
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
    })
    res.sendStatus(204)
})

const updateUser = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params
        validateMongoDbId(id)
        const body = {
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            email: req?.body?.email,
            mobile: req?.body?.mobile
        }
        const updUser = await User.findByIdAndUpdate(
            id,
            body,
            {
                new: true
            }
        )
        res.json(
            {
                message: 'Updated User Successful.',
                data: updUser
            }
        )
        res.json(updUser)
    } catch (error) {
        throw new Error(error)
    }
})

const getAllUser = asyncHandler(async (req, res) => {
    try {
        const getAllUsers = await User.find()
        res.json(getAllUsers)
    } catch (error) {
        throw new Error(error)
    }
})

const getAUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        validateMongoDbId(id)
        const getaUser = await User.findById(id)
        res.json({ getaUser })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        validateMongoDbId(id)
        const deleteUser = await User.findByIdAndDelete(id)
        res.json({ message: 'Deleted User Successful.' })
    } catch (error) {
        throw new Error(error)
    }
})

const blockedUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        validateMongoDbId(id)
        const blockedUr = await User.findByIdAndUpdate(
            id,
            { isBlocked: true },
            { new: true }
        )
        res.json(
            {
                message: 'User is Blocked.',
                data: blockedUr
            }
        )
    } catch (error) {
        throw new Error(error)
    }
})

const unBlockedUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        validateMongoDbId(id)
        const unblockedUr = await User.findByIdAndUpdate(
            id,
            { isBlocked: false },
            { new: true }
        )
        res.json(
            {
                message: 'User is UnBlocked.',
                data: unblockedUr
            }
        )
    } catch (error) {
        throw new Error(error)
    }
})


module.exports = { createUser, loginUser, getAllUser, getAUser, deleteUser, updateUser, blockedUser, unBlockedUser, handleRefreshToken, logout }