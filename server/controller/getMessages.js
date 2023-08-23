const Message = require("../models/Message");

const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (error) {
        res.json({error});
    }
}

module.exports = getMessages;