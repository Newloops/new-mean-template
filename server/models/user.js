const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
let Schema = mongoose.Schema

let rolesValid = {
    values: ['ADMIN_ROLE', 'USER_ROLE']
}

let userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        description: "can only be one of the enum values and is required"
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValid
    },
    status: {
        type: Boolean,
        default: true
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)