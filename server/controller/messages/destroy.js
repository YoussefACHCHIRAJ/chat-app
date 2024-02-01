const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");

const destroyAll = async (req, res) => {
    try {
        const authUser = new mongoose.Types.ObjectId(req.params.authUser) ;

        await Message.updateMany({ sender: authUser }, { isDeletedBySender: true });
        await Message.updateMany({ receiver: authUser }, { isDeletedByReceiver: true });
        await Message.deleteMany({ isDeletedBySender: { $ne: false }, isDeletedByReceiver: { $ne: false } });
        res.status(200).json({ data: "chat has been cleared" });
        
    } catch (error) {
        console.log('[clearChat]: ', error);
        res.json({ error });
    }
}

module.exports = { destroyAll };