const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
// const {
//     getUsers,
//     clearChat,
//     getMessages,
//     storeMessage,
//     setNotifications,
//     getNotifications,
//     deleteNotification
// } = require("./controller/");

const { UserController, MessageController, ChatController } = require("./controller/");
const ChatRoom = require("./models/ChatRoom");
const Message = require("./models/Message");

const app = express();
app.use(cors());
app.use(bodyParser.json());


/* chat server */
const server = app.listen(8080);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    },
});

io.on('connection', socket => {

    socket.on('join-chat', data => {
        socket.join(data.chatId);
        io.emit('join-chat-req', data);
        ChatController.store(data)
        console.log({data});
    });
    socket.on('join-req-accept', (chatId) => {
        socket.join(chatId);
    });
    socket.on('send-message', async newMessage => {
        socket.to(newMessage.chatRoomId).emit('receive-message', newMessage);
        MessageController.store(newMessage);
        // setNotifications(newMessage.sender,newMessage.receiver );
    })
    socket.on('disconnect', () => {
    });
})


// routes
app.get('/', (req, res) => {
    res.json('hello me');
});
app.get('/userslist', UserController.findAll);
app.get('/messages/:chatId', MessageController.index);
// app.delete('/messages/:userId', clearChat);
// app.get('/notifications/:id', getNotifications);
// app.delete("/notifications", deleteNotification);
module.exports = app;
