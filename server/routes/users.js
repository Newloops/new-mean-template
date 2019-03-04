const express = require('express')
const { authentication } = require('../middlewares/authentication')
const { verifyRole } = require('../middlewares/verifyRole')
const api = express.Router();

// Import Models and Controllers
const User = require('../models/user')
const UserCtrl = require('../controllers/user')

api.route('/user')
    .get(authentication, UserCtrl.findAllUsers)
    .post(authentication, UserCtrl.addUser)

api.route('/user/:id')
    .get(authentication, UserCtrl.findById)
    .put(authentication, UserCtrl.updateUser)
    .delete([authentication, verifyRole], UserCtrl.deleteUser);

module.exports = api