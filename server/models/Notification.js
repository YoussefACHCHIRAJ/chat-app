const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    count: Number
},{timestamps: true});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;