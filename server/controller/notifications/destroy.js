const User = require("../../models/User");

const deleteNotification = async (req, res) => {
    const sender = req.query.sender;
    const receiver = req.query.receiver;
    try {
        // const senderId = User.findOne(sender);
        // await User.updateOne({userId:receiver}, {$pull: {notifications: {senderId}}});
        res.json({deleteNotify: true});
    } catch (error) {
        console.log('[deleteNotification]: ', error);
        res.json({error});
    }
}

module.exports = deleteNotification;