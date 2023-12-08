const Message = require("../../models/Message");

const destroyAll = async (req, res) => {
    const loggedInUserId = req.params.loggedInUserId;
    try {

        await Message.updateMany({ sender: loggedInUserId }, { isDeletedBySender: true });
        await Message.updateMany({ receiver: loggedInUserId }, { isDeletedByReceiver: true });
        await Message.deleteMany({ isDeletedBySender: { $ne: false }, isDeletedByReceiver: { $ne: false } });
        res.status(200).json({ data: "chat has been cleared" });
    } catch (error) {
        console.log('[clearChat]: ', error);
        res.json({ error });
    }
}

module.exports = { destroyAll };