const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { app, runChatServer } = require("./app");

dotenv.config();
const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log('Connected successfuly');
        console.log('server running');
        /* chat server */
        const server = app.listen(PORT);
        runChatServer(server);

    }).catch(err => {
        console.log(err);
    });