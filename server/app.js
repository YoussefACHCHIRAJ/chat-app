const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const {
    getUsers,
    clearChat,
    getMessages,
    saveMessageOnDB,
    setNotifications,
    getNotifications,
    deleteNotification
} = require("./controller/");

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
                socket.to(newMessage.chatId).emit('receive-message', newMessage);
                saveMessageOnDB(newMessage);
                setNotifications(newMessage.sender,newMessage.receiver );
            })
            socket.on('disconnect', () => {
            });
        })


        // routes
        app.get('/', (req, res) => {
            res.json('hello me');
        });
        app.get('/userslist', getUsers);
        app.get('/messages/:userId', getMessages);
        app.delete('/messages/:userId', clearChat);
        app.get('/notifications/:id', getNotifications);
        app.delete("/notifications", deleteNotification);

    }).catch(err => {
        console.log(err);
    });


module.exports = app;
