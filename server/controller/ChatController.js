const ChatRoom = require("../models/ChatRoom");

class ChatController {
    static store({chatId, user1, user2}){
        ChatRoom.create()
    }
}