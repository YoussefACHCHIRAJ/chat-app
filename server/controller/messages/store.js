const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");
const User = require("../../models/User");

const store = async newMessage => {
    const { sender, receiver } = newMessage
    try {
       
        newMessage = {
            ...newMessage,
            sender: new mongoose.Types.ObjectId(sender._id),
            receiver: new mongoose.Types.ObjectId(receiver._id),
        };
        const createdMessage = Message.create(newMessage);
        // await User.updateMany(
        //     { _id: { $in: [sender._id, receiver._id] } },
        //     { $push: { messages: { id: createdMessage._id } } });

        return createdMessage._id;
    } catch (error) {

        console.log('[save new messages: ]', error);
        return null;

    }


}

module.exports = store;