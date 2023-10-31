const Message = require("../models/Message");

class MessageController {

    static index(req, res) {
        const chatId = req.params.chatId;
        Message.findAll(chatId).then(result => res.json({ result })).catch(error => res.json({ error }));
    }

    static store(message) {
        Message.create(message);
    }


}

module.exports = MessageController;