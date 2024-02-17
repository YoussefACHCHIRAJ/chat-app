const mongoose = require("mongoose");
const Message = require("../../models/Message");
const User = require("../../models/User");
const Chat = require("../../models/Chat");

const getLastMessages = async (req, res) => {
    try {
     
        const authUserParam = req.params.authUser;
     
        const authUser = new mongoose.Types.ObjectId(authUserParam);
     
        const friends = await User.find({ _id: { $ne: authUser } }).select("_id");

        const lastMessages = await Promise.all(friends.map(async friend => {

          
            const chatId = [authUser, friend._id].sort().join("");
          
            const chat = await Chat.findOne({ chatId });
          
            const lastMessage = await Message.findOne({
                chat,
                $or: [
                    { sender: authUser, isDeletedBySender: false },
                    { receiver: authUser, isDeletedByReceiver: false }
                ]
            }).sort({ createdAt: -1 });
            return {
                friend ,
                lastMessage
            }
        }))

        res.status(200).json({ lastMessages });
    } catch (error) {
        console.error('Error getting all last messages:', error);
        res.status(500).json({ error: "Failed to retrieve the last messages" });
    }
}


module.exports = getLastMessages;