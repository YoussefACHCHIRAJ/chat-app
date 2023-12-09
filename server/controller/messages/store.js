const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");

const store = async newMessage => {
    const { sender, receiver } = newMessage
    try {
       
        newMessage = {
            ...newMessage,
            sender: new mongoose.Types.ObjectId(sender._id),
            receiver: new mongoose.Types.ObjectId(receiver._id),
        };
        Message.create(newMessage);
       
    } catch (error) {
        console.log('[save new messages: ]', error);
    }


}

module.exports = store;