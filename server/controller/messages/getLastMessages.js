const { default: mongoose } = require("mongoose");
const Message = require("../../models/Message");

const getLastMessages = async (req, res) => {
    
    try {
        const sender = new mongoose.Types.ObjectId(req.params.authUser);
        
        const lastMessages = await Message.find({
            $or: [
                {sender},
                {receiver: sender}
            ]
        });

        console.log({lastMessages});
        res.status(200).json({messages: []});
    } catch (error) {
        console.error('Error getting all last messages:', error);
        res.status(401).json({error});
    }
}


module.exports = getLastMessages;