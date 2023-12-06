const Notification = require("../../models/Notification");
const User = require("../../models/User");

const store = async (sender, receiver, message) => {
    try {

        // const [sender, receiver] = await Promise.all([
        //     User.findOne({ userId: senderId }),
        //     User.findOne({ userId: receiverId })
        // ]);

        const notification = await Notification.findOne({ sender: sender._id });

        if (notification) {
            notification.count++;
            await notification.save();
            return;
        }

        
        const newNotification = await new Notification({
            receiver: receiver._id,
            sender: sender._id,
            message,
            count: 0
        });
        await newNotification.save();

    } catch (error) {
        console.log('[setNotification]: ', error);
        return false;
    }
}

module.exports = store;