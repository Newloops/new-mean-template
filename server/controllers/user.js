const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = mongoose.model('User')
const Category = mongoose.model('Category')

//GET - Return all users in the DB
exports.findAllUsers = (req, res) => {

    let from = req.query.from || 0
    from = Number(from)

    let limit = req.query.limit || 5
    limit = Number(limit)

    User.find({}, 'email role status')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {

            if (err) {
                return res.status(400).json({
                    success: false,
                    error: err.errors
                })
            }

            User.count({}, (req, total) => {

                res.status(200).json({
                    success: true,
                    users,
                    total
                })

                console.log('GET /users')
                
            })
            
        })

}

//GET - Return a User with specified ID
exports.findById = (req, res) => {

    User.findById(req.params.id, 'email role status', (err, user) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err.errors
            })
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                error: {
                  message: 'Usuario no existe!'
                }
            })
        }
        
        res.status(200).json({
            success: true,
            user: user
        })

        console.log('GET /user/' + req.params.id)

    })

}

//POST - Insert a new User in the DB
exports.addUser = (req, res) => {

    console.log('POST');
    console.log(req.body)

    let user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    })

    user.save((err, user) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err.errors
            })
        }

        user.password = null

        res.status(200).json({
            success: true,
            user
        })

        console.log('Usuario creado!')

    })

}

//PUT - Update a register already exists
exports.updateUser = (req, res) => {

    User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}, (err, user) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err.errors
            })
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                error: {
                  message: 'Usuario no existe!'
                }
            })
        }

        res.status(200).json({
            success: true
        })

        console.log('Usuario actualizado!')

    })

}

//DELETE - Delete a User with specified ID
exports.deleteUser = (req, res) => {

    User.findByIdAndRemove(req.params.id, (err, user) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err.errors
            })
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                error: {
                  message: 'Usuario no existe!'
                }
            })
        }

        res.status(200).json({
            success: true
        })

        console.log('Usuario eliminado!')

    })

}

//GET - Return a User with specified ID
exports.findByCategoriesByUser = async (req, res) => {

    console.log(req.user._id)

    let user = await User.findById(req.user._id)

    Category.find({user: req.user._id}, 'name')
        .exec((err, categories) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err.errors
            })
        }

        if (!user) {
            return res.status(400).json({
                success: false,
                error: {
                  message: 'Usuario no existe!'
                }
            })
        }
        
        res.status(200).json({
            success: true,
            categories,
            user

        })

        console.log('GET /user-categories')

    })

}