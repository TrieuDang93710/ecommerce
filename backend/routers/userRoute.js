const express = require('express')
const router = express.Router()
const {createUser, loginUser, getAllUser, getAUser, deleteUser, updateUser} = require('../controller/userController')

router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/get-users', getAllUser)
router.get('/:id', getAUser)
router.delete('/:id', deleteUser)
router.put('/:id', updateUser)

module.exports = router