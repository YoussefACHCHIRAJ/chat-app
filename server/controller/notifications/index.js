const { default: mongoose } = require("mongoose");
const Notification = require("../../models/Notification");

const getNotifications = async (req, res) => {
    const authUser = req.params.id;
    try {

        const authUserId = new mongoose.Types.ObjectId(authUser);

        const notifications = await Notification.find({receiver: authUserId});
        res.json({notifications: notifications});

    } catch (error) {
        console.log('[getNotification]: ', error);
        res.json({error});
    }
}

module.exports = getNotifications;