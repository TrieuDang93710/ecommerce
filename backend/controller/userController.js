const { generateToken } = require('../config/jwToken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')

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
    const findUser = await User.findOne({ email })
    if (findUser && await findUser.isPasswordMatched(password)) {
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

const updateUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const user = req.body
        const updUser = await User.findByIdAndUpdate(
            id,
            {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobile: user.mobile
            },
            {
                new: true
            }
        )
        res.json({ message: 'Updated User Successful.' })
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
        const getaUser = await User.findById(id)
        res.json({ getaUser })
    } catch (error) {
        throw new Error(error)
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const deleteUser = await User.findByIdAndDelete(id)
        res.json({ message: 'Deleted User Successful.' })
    } catch (error) {
        throw new Error(error)
    }
})
module.exports = { createUser, loginUser, getAllUser, getAUser, deleteUser, updateUser }