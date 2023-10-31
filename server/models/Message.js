const Database = require("../databases/database");

class Message {
    static create(message) {
        const { content, senderId, receiverId, time, chatRoomId } = message;
        const pool = Database.createPool();
        pool.query('INSERT INTO message (content, senderId, receiverId, time, chatRoomId) VALUES(?, ?, ?, ?, ?)', 
                                        [content, senderId, receiverId, new Date(time), chatRoomId], (error, result) => {
            if (error) {
                console.log('error: ', error);
                return;
            }
            return result
        })
    }

    static findAll(chatId){
        const pool = Database.createPool();
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM message WHERE chatRoomId = ?', 
                                        [chatId], (error, result) => {
            if (error) {
                console.log('error: ', error);
                return reject(error);
            }
            return resolve(result);
        })
        })
    }
}


module.exports = Message;