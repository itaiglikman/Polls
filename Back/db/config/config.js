const dotenv = require('dotenv');
dotenv.config();

const username = process.env.DB_USERNAME || 'root';
const password = process.env.DB_PASSWORD || '';
const database = process.env.DB_NAME || 'polls_db';
const host = process.env.DB_HOST || 'localhost';
const dialect = 'mysql';

module.exports = {
    "development": {
        "username": username,
        "password": password,
        "database": database,
        "host": host,
        "dialect": dialect,
    },
    "test": {
        "username": username,
        "password": password,
        "database": database,
        "host": host,
        "dialect": dialect,
    },
    "production": {
        "username": username,
        "password": password,
        "database": database,
        "host": host,
        "dialect": dialect,
    }
}