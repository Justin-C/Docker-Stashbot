/**
 * Connect to heroku postgres db
 */
const { Client } = require('pg');

const connectToDb = () => {
    return new Client({
        user: 'root',
        host: 'stashbot-db', // todo this is env variable? other container name
        database: 'root',
        password: 'pass',
        port: 5432,
    });
}  

module.exports.connectToDb = connectToDb;
