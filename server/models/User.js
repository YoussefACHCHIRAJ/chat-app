const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    messages: {
        type: [{
            id: String,
            chatId: String
        }],
        default: []
    },
    friends: {
        type: Array,
        default: []
    },
    notifications: {
        type: [{
            sender: String,
            count: Number,
            messages: Array,
        }],
        default: []
    },
    blocks: {
        type: Array,
        default: []
    }
},{timestamps: true});

const User = mongoose.model("User", UserSchema);

module.exports = User;