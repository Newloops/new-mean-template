const express = require('express')
const { authentication } = require('../middlewares/authentication')
const { verifyRole } = require('../middlewares/verifyRole')
const api = express.Router();

// Import Models and Controllers
const Category = require('../models/category')
const CategoryCtrl = require('../controllers/category')

api.route('/category')
    .get(authentication, CategoryCtrl.findAllCategories)
    .post(authentication, CategoryCtrl.addCategory)

api.route('/category/search/:term')
    .get(authentication, CategoryCtrl.searchCategories)

// api.route('/user/:id')
//     .get(authentication, UserCtrl.findById)
//     .put(authentication, UserCtrl.updateUser)
//     .delete([authentication, verifyRole], UserCtrl.deleteUser)

module.exports = api