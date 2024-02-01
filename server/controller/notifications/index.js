const { default: mongoose } = require("mongoose");
const Notification = require("../../models/Notification");

const getNotifications = async (req, res) => {
    try {

        const authUser = new mongoose.Types.ObjectId(req.params.id);
        console.log({authUser});

        const notifications = await Notification.find({receiver: authUser});
        res.json({notifications});

    } catch (error) {
        console.log('[getNotification]: ', error);
        res.json({error});
    }
}

module.exports = getNotifications;