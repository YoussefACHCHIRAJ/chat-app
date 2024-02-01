const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");

const getAll = async (req, res) => {
    try {
        const authUser =  new mongoose.Types.ObjectId(req.params.authUser);
        const recipient = new mongoose.Types.ObjectId(req.query.recipient);
        
        const messages = await Message.find({
            $or : [
                {sender: authUser, receiver: recipient, isDeletedBySender: {$ne: true}},
                {sender: recipient, receiver: authUser, isDeletedByReceiver: {$ne: true}}
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