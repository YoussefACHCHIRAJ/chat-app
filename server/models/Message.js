const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    chatId: String,
    sender: String,
    receiver: String,
    content: String,
    time: String,
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;