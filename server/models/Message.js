const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    chatId: String,
    time: Date,
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;