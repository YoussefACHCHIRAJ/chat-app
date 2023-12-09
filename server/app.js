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



const users = new Map();


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

const runChatServer = () => {

    const server = app.listen(PORT);
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
        },
    });

    io.on('connection', socket => {

        socket.on("log-in", userId => {
            if (userId) {
                users.set(userId, socket);
                io.emit("user-connected", Array.from(users.keys()))
            }
        });

        socket.on('send-message', async newMessage => {
            const { sender, receiver } = newMessage;
            const receiverSocket = users.get(receiver.userId);

            if (receiverSocket) {
                receiverSocket.emit('receive-message', newMessage);
            }
            await storeMessages(newMessage);

            await storeNotifications(sender, receiver);
            io.emit("refresh-notifications");
            console.log("notifications has been refetch.")
        })
        socket.on('disconnect', () => {
            users.forEach((socketStored, userId) => {
                if (socketStored === socket) {
                    users.delete(userId);
                }
            })
            io.emit("user-disconnected", Array.from(users.keys()))
        });
    })
}

module.exports = app;



/* Task To Do : 
   -----------------------------------------------------------
    + Send a unicast message. [done]
    + Indicate oline users. [done]
    + Clear individual chat from one side (sender/receiver). [done] \in the test mode....
    + Set notifications. => [bug to fix ] : if the receiver in the chat room don't save the notification.
    + Convert a fetch requests to axios requests.
    + Add indexes to the database.
    + Indicate the last message in the friends list.
    + Add lazy loading.
    + Search for a user.
    + Manage contacts.
    + Block a user.

*/
