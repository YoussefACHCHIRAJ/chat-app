const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const storeMessages = require("./controller/messages/store");
const storeNotifications = require("./controller/notifications/store");

const messageRoute = require("./routes/message.js");
const notificationRoute = require("./routes/notification.js");
const userRoute = require("./routes/user.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());


dotenv.config();
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;


mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('server running');
        /* chat server */
        runChatServer();

        // routes
        app.use(messageRoute);
        app.use(notificationRoute);
        app.use(userRoute);

    }).catch(err => {
        console.log(err);
    });

const runChatServer = () =>  {
    
    const server = app.listen(PORT);
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
        },
    });

    io.on('connection', socket => {

        socket.on('join-chat', data => {
            socket.join(data.chatId);
            io.emit('join-chat-req', data);
        });
        socket.on('join-req-accept', chatId => {
            socket.join(chatId);

        });
        socket.on('send-message', async newMessage => {
            const { sender, receiver, chatId } = newMessage;

            socket.to(chatId).emit('receive-message', newMessage);

            const messageId = await storeMessages(newMessage);

            storeNotifications(sender, receiver, messageId);
        })
        socket.on('disconnect', () => {
        });
    })
}

module.exports = app;
