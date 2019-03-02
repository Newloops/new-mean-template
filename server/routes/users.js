const express = require('express')

//var middleware = require('../middleware')
const api = express.Router();

// Import Models and Controllers
const User = require('../models/user')
const UserCtrl = require('../controllers/user')

api.route('/user')
    .get(UserCtrl.findAllUsers)
    .post(UserCtrl.addUser)

api.route('/user/:id')
    .get(UserCtrl.findById)
    .put(UserCtrl.updateUser)
    .delete(UserCtrl.deleteUser);

module.exports = api