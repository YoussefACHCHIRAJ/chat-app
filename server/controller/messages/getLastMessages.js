const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");
const User = require("../../models/User");
const Chat = require("../../models/Chat");

const getLastMessages = async (req, res) => {

    try {
        const authUser = new mongoose.Types.ObjectId(req.params.authUser);
        const friends = await User.find({ _id: { $ne: authUser } }).select("_id, email");

        const lastMessages = await Promise.all(friends.map(async friend => {

            const chatId = [authUser, friend._id].sort().join("");
            const chat = await Chat.findOne({ chatId });

            let lastMessage = await Message.findOne({ chat }).sort({ createdAt: -1 });
            return {
                friend: friend,
                lastMessage
            }
        }))

        res.status(200).json({ lastMessages });
    } catch (error) {
        console.error('Error getting all last messages:', error);
        res.status(401).json({ error });
    }
}


module.exports = getLastMessages;