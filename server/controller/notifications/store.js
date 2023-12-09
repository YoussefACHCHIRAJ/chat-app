const { default: mongoose } = require("mongoose");
const Notification = require("../../models/Notification");

const store = async (sender, receiver) => {
    try {
        const receiverId = new mongoose.Types.ObjectId(receiver._id);
        const senderId = new mongoose.Types.ObjectId(sender._id);
        const notification = await Notification.findOne({ receiver: receiverId, sender: senderId });


        if (notification) {
            notification.count++;
            await notification.save();

            return notification._id;
        }

        const newNotification = await Notification.create({
            receiver: receiverId,
            sender: senderId,
            count: 0
        });

        return newNotification._id;
    } catch (error) {
        console.log('[setNotification]: ', error);
        return false;
    }
}

module.exports = store;