
const dotenv = require("dotenv").config();
const clerk = require("@clerk/clerk-sdk-node");
const User = require("../../models/User");


const saveUsersToDB = async userData => {
    const isUserExist = await User.findOne({ userId: userData.userId });

    if (isUserExist) return;

    User.create(userData);
    
}
const getUsers = async (req, res) => {
    try {
        const usersList = await clerk.users.getUserList();

        if (!usersList) res.json({ users: [] });

        await Promise.all(usersList.map(async user => {
            const userData = {
                userId: user.id,
                username: `${user?.firstName} ${user?.lastName}`,
                email: user.emailAddresses[0].emailAddress,
                profile: user?.imageUrl
        
            }

            await saveUsersToDB(userData);
        }));

        const usersListData = await User.find();
        res.json({ users: usersListData });
    } catch (error) {
        console.log('[users]: ', error);
        res.json({ error });
    }
}

module.exports = getUsers;