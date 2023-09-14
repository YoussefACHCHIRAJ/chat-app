
const dotenv = require("dotenv").config();
const clerk = require("@clerk/clerk-sdk-node");
const User = require("../models/User");


const saveUsersToDB = async user => {
    const isUserExist = await User.findOne({ userId: user.id });

    if (isUserExist) return;

    const newUser = new User({
        userId: user.id,
        username: `${user?.firstName} ${user?.lastName}`
    });
    await newUser.save();
}
const getUsers = async (req, res) => {
    try {
        const usersList = await clerk.users.getUserList();

        if (!usersList) res.json({ users: [] });

        const usersListData = await Promise.all(usersList.map(async user => {
            await saveUsersToDB(user);
            return {
                id: user.id,
                fullName: `${user?.firstName} ${user?.lastName}`,
                email: user.emailAddresses[0].emailAddress,
                profile: user?.imageUrl
            }
        }));
        res.json({ users: usersListData });
    } catch (error) {
        res.json({ error });
    }
}

module.exports = getUsers;