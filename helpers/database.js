const mariadb = require("mariadb");
const dotenv = require("dotenv");

dotenv.config({ path: '.env-local'});

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER, // eventually we're going to create a login page that will pass a user name that will allow them to log into mariadb from the front end.
    password: process.env.DB_PASS, // same for password.
    database: process.env.DB_NAME,
    connectionLimit: 5
});

pool.getConnection((err, connection) => {
    if(err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }

    if(connection) connection.release();

    return;
});

module.exports = pool;