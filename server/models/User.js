const Database = require("../databases/database");

class User {

    static async create(user) {
        const pool = Database.createPool();
        const isUserExist = await User.findOrFail(user);
        console.log('result of findorfail: ', isUserExist)
        if (isUserExist) return;
        
        pool.query('INSERT INTO users (username, email) VALUES(?, ?)', [user.fullName, user.email], (error, result) => {
            if (error) {
                console.log('error: ', error);
                return;
            }
            return console.log('result: ', result);
        })
    }

    static find(user) {
        const pool = Database.createPool();
        return new Promise((resolve, reject) => {
            pool.query('SELECT username FROM users WHERE email = ? limit 1', [user.email], (error, result) => {
                if (error) {
                    console.log('error in find : ', error);
                    reject(error);
                }
                console.log('result in find: ', result);
                resolve(result);
            });
        })
    }

    static async findOrFail(user) {
        const result = await User.find(user);
        console.log('result in findorfail: ', result);
        return result && result.length ? result : null;
    }
}

module.exports = User;