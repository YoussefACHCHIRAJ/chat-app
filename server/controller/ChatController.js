const ChatRoom = require("../models/ChatRoom");

class ChatController {
    static store(chatData){
        ChatRoom.create(chatData)
    }
}

module.exports  = ChatController;