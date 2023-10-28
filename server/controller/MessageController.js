const Message = require("../models/Message");

class MessageController {
    
    static index(req, res){
        return res.json({});
    }

    static store(message) {
            Message.create(message);
    }
}

module.exports = MessageController;