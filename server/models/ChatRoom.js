const Database = require("../databases/database");

class ChatRoom {
   
    static async create(chatdata) {
        const { chatId, senderId, receiverId } = chatdata
        const pool = Database.createPool();
        const isChatExist = await ChatRoom.findOrFail(chatId)
        if (isChatExist) return;

        pool.query('INSERT INTO chatRoom (id, user1, user2) VALUES(?, ?, ?)', [chatId, receiverId, senderId], (error, result) => {
            if (error) {
                console.log('error: ', error);
                return;
            }
            return result
        })
    }

    static find(chatId) {
        const pool = Database.createPool();
        return new Promise((resolve, reject) => {
            pool.query('Select * from chatRoom where id = ?', [chatId], (error, result) => {
                if (error) {
                    console.log('error: ', error);
                    reject(error);
                }
                return resolve(result);
            });
        })
    }

    static async findOrFail(chatId) {
        const chatRoom = await ChatRoom.find(chatId);
        return chatRoom && chatRoom.length > 0 ? chatRoom : null;
    }
}


module.exports = ChatRoom;