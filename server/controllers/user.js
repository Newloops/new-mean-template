const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const _ = require('underscore')
const User = mongoose.model('User')

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

                console.log('GET /users')

                res.status(200).json({
                    success: true,
                    users,
                    total
                })
                
            })
            
        })

}

//GET - Return a User with specified ID
exports.findById = (req, res) => {

    User.findById(req.params.id, function(err, user) {

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
    console.log(req.body);

    var user = new User({
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
            user: user
        })

        console.log('Usuario creado!')

    })

}

//PUT - Update a register already exists
exports.updateUser = (req, res) => {

    let body = _.pick(req.body, ['email', 'role', 'status'])

    User.findByIdAndUpdate(req.params.id, body, {new: true, runValidators: true}, (err, user) => {

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
            user
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
            success: true,
            user
        })

        console.log('Usuario eliminado!')

    })

}