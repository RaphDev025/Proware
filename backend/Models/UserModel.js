const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    user_id:{
        type: String,
        required: true,
        unique: true
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user_type: {
        type: String,
        default: 'student',
        required: true
    },
}, { timestamps: true })

// connected and created a schema model and inserted in the existing collection named user_db
module.exports = mongoose.model('User', UserSchema, 'user_db') 