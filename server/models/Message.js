const Database = require("../databases/database");

class Message {
    static create(message) {
        const { content, sender, receiver, time, chatId } = message;
        const pool = Database.createPool();
        pool.query('INSERT INTO message (content, senderId, receiverId, time, chatRoomId) VALUES(?, ?, ?, ?, ?)', 
                                        [content, sender, receiver, new Date(time), chatId], (error, result) => {
            if (error) {
                console.log('error: ', error);
                return;
            }
            return result
        })
    }
}


module.exports = Message;