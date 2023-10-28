const dotenv = require("dotenv").config();
const clerk = require("@clerk/clerk-sdk-node");
const User = require("../models/User");

class UserController {
   
    static async findAll(req, res) {
        try {
            const usersList = await clerk.users.getUserList();

            if (!usersList) res.json({ users: [] });

            const usersListData = await Promise.all(usersList.map(async user => {
                const userInfo = {
                    id: user.id,
                    fullName: `${user?.firstName} ${user?.lastName}`,
                    email: user.emailAddresses[0].emailAddress,
                    profile: user?.imageUrl
                }
                await User.create(userInfo);
                return userInfo;
            }));
            res.json({ users: usersListData });
        } catch (error) {
            console.log(error);
            res.json({ error });
        }
    }
}

module.exports = UserController;