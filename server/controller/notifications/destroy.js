const { default: mongoose } = require("mongoose");
const Notification = require("../../models/Notification");

const deleteNotification = async (req, res) => {
    try {
        const authUser = req.params.authUser;
        const sender = req.query.sender;
        const authUserId = new mongoose.Types.ObjectId(authUser);
        const senderId = new mongoose.Types.ObjectId(sender);
        const deleteResult = await Notification.updateOne({
            receiver: authUserId,
            sender: senderId
        }, { count: 0 }
        )

        res.json({ deleteNotify: true });
    } catch (error) {
        console.log('[deleteNotification]: ', error);
        res.json({ error });
    }
}

module.exports = deleteNotification;