const Message = require("../../models/Message");
const User = require("../../models/User");

const getAll = async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findOne({ userId });
        const messagesIds = user.messages.map(message => message.id);
        const messages = await Message.find({ _id: { $in: messagesIds } }).populate('sender').populate('receiver');
        console.log({messages, messagesIds, user})
        res.json(messages);
    } catch (error) {
        console.log('[getMessages]: ', error);
        res.json({ error });
    }
}

module.exports = getAll;