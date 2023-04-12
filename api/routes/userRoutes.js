const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router()

router
  
    .get('/users', UserController.readAllUsers)
    .get('/users/:id', UserController.readOneUser)
    .post('/users', UserController.postUser)
    .put('/users/:id', UserController.updateUser)
    .delete('/users/:id', UserController.deleteUser)

module.exports = router 