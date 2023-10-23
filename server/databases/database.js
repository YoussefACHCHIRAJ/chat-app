const mysql = require('mysql2')
const dotenv = require('dotenv').config();

class Database {
    static createPool() {

        return mysql.createPool({
            host: process.env.host,
            port: process.env.port,
            user: process.env.user,
            password: process.env.password,
            database: process.env.database
        });
    };
    
}

module.exports = Database;