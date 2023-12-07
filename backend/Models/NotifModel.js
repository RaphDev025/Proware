const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotificationSchema = new Schema({
    to: String,
    from: String,
    content: String,
    title: String,
}, { timestamps: true })

module.exports = mongoose.model('Notification', NotificationSchema, 'notif_db') 