
const dotenv = require("dotenv").config();
const clerk = require("@clerk/clerk-sdk-node");
const getUsers = async (req, res) => {
    try {
        const usersList = await clerk.users.getUserList();

        if (!usersList) res.json({ users: [] });

        const usersListData = usersList.map(user => {
            return {
                id: user.id,
                fullName: `${user?.firstName} ${user?.lastName}`,
                email: user.emailAddresses[0].emailAddress,
                profile: user?.imageUrl
            }
        });
        res.json({ users: usersListData });
    } catch (error) {
        res.json({ error });
    }
}

module.exports = getUsers;