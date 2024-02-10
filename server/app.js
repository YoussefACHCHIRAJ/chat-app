const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const storeNotifications = require("./controller/notifications/store");
const storeMessages = require("./controller/messages/store");
const notificationRoute = require("./routes/notification.js");
const messageRoute = require("./routes/message.js");
const userRoute = require("./routes/user.js");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const runChatServer = server => {
    const users = new Map();
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
            io.emit("refresh-notifications", sender);
        });
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


app.use("/messages", messageRoute);
app.use("/notifications", notificationRoute);
app.use("/users", userRoute);

module.exports = { app, runChatServer };



/* Task To Do : 
   -----------------------------------------------------------
[done] + Send a unicast message. 
[done] + Indicate oline users. 
[done] + Clear individual chat from one side (sender/receiver).
[done] + Set notifications. 
[done] + Convert a fetch requests to axios requests.
[done] + Indicate the last message in the friends list.
[done] + Update Username (and profile picture later)
       + Block a user.
       + Search for a user.
       + Manage contacts.
       + Add lazy loading.
       + Add indexes to the database.

/* Bugs To Fix : 
   -----------------------------------------------------------

[Fixed] + message deleted from only one chat, not all the chats (To fix use the chat field)
[Fixed] + when the chat has been cleared, the last messages should also be cleared
*/
