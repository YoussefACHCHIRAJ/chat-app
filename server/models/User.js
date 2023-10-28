const Database = require("../databases/database");

class User {

    static async create({ id, fullName, email }) {
        const pool = Database.createPool();
        const isUserExist = await User.findOrFail(email);
        if (isUserExist) return;

        pool.query('INSERT INTO users (id, username, email) VALUES(?, ?, ?)',
            [id, fullName, email], (error, result) => {
                if (error) {
                    console.log('error: ', error);
                    return;
                }
                return result
            })
    }

    static find(email) {
        const pool = Database.createPool();
        return new Promise((resolve, reject) => {
            pool.query('SELECT username FROM users WHERE email = ? limit 1', [email], (error, result) => {
                if (error) {
                    console.log('error in find : ', error);
                    reject(error);
                }
                resolve(result);
            });
        })
    }

    static async findOrFail(email) {
        const result = await User.find(email);
        return result && result.length ? result : null;
    }
}

module.exports = User;