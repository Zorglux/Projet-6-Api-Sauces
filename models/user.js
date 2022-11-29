const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
// ================================
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true, match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ },
    password: {type: String, required: true } 
})
userSchema.plugin(uniqueValidator)
// ================================
module.exports = mongoose.model('User', userSchema)