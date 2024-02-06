const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");
const Chat = require("../../models/Chat");

const store = async newMessage => {
    const { sender, receiver, chat:chatId } = newMessage
    try {

        let chat = await Chat.findOne({chatId}).select("_id");
        if(!chat){
            chat = await createChat(sender, receiver, chatId);
        }

        newMessage = {
            ...newMessage,
            sender: new mongoose.Types.ObjectId(sender._id),
            receiver: new mongoose.Types.ObjectId(receiver._id),
            chat:chat?._id
        };
        await Message.create(newMessage);
       
    } catch (error) {
        console.log('[save new messages: ]', error);
    }
}

const createChat = async (userOne, userTwo, chatId) => {
    try {
        const newChat = new Chat({ chatId, userOne, userTwo});
        await newChat.save();
        return {_id: newChat?._id};
    } catch (error) {
        console.log('[create new chat: ]', error);
        
    }
}

module.exports = store;