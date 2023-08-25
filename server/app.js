const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Message = require("./models/Message");
const getUsers = require("./controller/getUsers");
const getMessages = require("./controller/getMessages");

const app = express();
app.use(cors());
app.use(bodyParser.json());



const DB_URI = process.env.DB_URI;
const PORT = 8080;


mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('server running');
    }).catch(err => console.log(err));

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
        const whoseInChat = io.sockets.adapter.rooms;
        console.log("whose in chat:", whoseInChat);
    });
    socket.on('send-message', async newMessage => {
        socket.to(newMessage.chatId).emit('receive-message', newMessage);
        // send messages to db
        const newSavedMessage = new Message(newMessage);
        await newSavedMessage.save();
    })
    socket.on('disconnect', () => {
    });
})


// routes
app.get('/', (req, res) => {
    res.json('hello me');
});
app.get('/userslist', getUsers);
app.get('/messages', getMessages);


module.exports = app;
