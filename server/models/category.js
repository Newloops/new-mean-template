const mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Category', userSchema)