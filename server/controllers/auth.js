const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = mongoose.model('User')

//POST - Route to authenticate a user
exports.auth = (req, res) => {

    User.findOne({
        email: req.body.email
    },
    (err, user) => {

        if (err) {
            return res.status(400).json({
                success: false,
                error: err.errors
            })
        }

        if (!user) {
            return res.json({
                success: false,
                error: {
                  message: 'Authentication failed. Email not found.'
                }
            })
        } 

        // check if password matches
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.json({
                success: false,
                error: {
                    message: 'Authentication failed. Wrong password.'
                }
            });
        }

        let token = jwt.sign({
            user
        }, '6aec65c707691e4aa757d1d9866dc', { expiresIn: 60 * 60 * 24 * 30 })

        user.password = null
        
        // return the information including token as JSON
        res.status(200).json({
            success: true,
            user,
            token
        })

        console.log('POST /authenticate')

    })
    
}