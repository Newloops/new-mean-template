const express = require('express')

//var middleware = require('../middleware')
const api = express.Router();

// Import Models and Controllers
const User = require('../models/user')
const UserCtrl = require('../controllers/auth')

api.route('/auth')
    .post(UserCtrl.auth);

module.exports = api