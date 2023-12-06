const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: String,
    username: String,
    email: String,
    profile: String,
    messages: {
        type: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Message'
            },
        chatId: String
        }],
        default: []
    },
    notifications: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'Notification'
        }],
        default: []
    },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;