const express = require('express')

//var middleware = require('../middleware')
const api = express.Router();

// Import Models and Controllers
const User = require('../models/user')
const UserCtrl = require('../controllers/auth')

api.route('/auth')
    .post(UserCtrl.auth);

api.route('/register')
    .post(UserCtrl.register);

module.exports = api