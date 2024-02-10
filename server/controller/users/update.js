const { default: mongoose } = require("mongoose");
const User = require("../../models/User");

const update = async (req, res) => {
    try {
        const {username} = req.body;
        const authUserParam = req.params.authUserId;
        const _id = new mongoose.Types.ObjectId(authUserParam);
        console.log({ username , _id});
        if (!username.trim()) {
            throw {
                username: "username can not be empty"
            }
        }
        await User.findOneAndUpdate({ _id }, { username });

        res.status(201).json({ updated: true });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
}

module.exports = update;