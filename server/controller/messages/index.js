const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");
const Chat = require("../../models/Chat");

const getAll = async (req, res) => {
    try {
       
        const authUserParam = req.params.authUser;
       
        const receiverParam = req.query.receiver;
       
        const authUser = new mongoose.Types.ObjectId(authUserParam);
       
        const receiver = new mongoose.Types.ObjectId(receiverParam);
       
        const chatId = [authUser, receiver].sort().join("");
       
        const chat = await Chat.findOne({ chatId });

        const messages = await Message.find({
            chat,
            $or: [
                { sender: authUser, isDeletedBySender: false },
                { receiver: authUser, isDeletedByReceiver: false }
            ]
        })
            .populate('sender')
            .populate('receiver');

        res.json({ messages });
    } catch (error) {
        console.log('[getMessages]: ', error);
        res.json({ error });
    }
}

module.exports = getAll;