const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");

const getAll = async (req, res) => {
    const loggedInUser = req.params.loggedInUser;
    const recipient = req.query.recipient;
    try {
        const messages = await Message.find({
            $or : [
                {sender: loggedInUser, receiver: recipient, isDeletedBySender: {$ne: true}},
                {sender: recipient, receiver: loggedInUser, isDeletedByReceiver: {$ne: true}}
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