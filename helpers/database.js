// This file is essential to getting NodeJS/ExpressJS to "talk" to our MariaDB server,
// It's important to note that the majority of this was taken from a Youtuber named Techedemic, who was one of the few
// on Youtube who covered how to establish a MariaDB connection to NodeJS/ExpressJS without using an ORM like Sequelize or KnexJS/ObjectionJS

const mariadb = require("mariadb"); // bring in our mariaDB module
const dotenv = require("dotenv"); // and our dotenv module to reference our .env-local file, which stores our sensitive information

dotenv.config({ path: '.env-local'}); // establish the path to our .env-local file

// here it is, the module logs into mariadb, and connects it to our localhost, in this case localhost:3000
const pool = mariadb.createPool({
    host: process.env.DB_HOST, // established pretty simply as PORT or localhost:3000
    user: process.env.DB_USER, // at some point I'd like to add login functionality where this variable is somehow imported from a login page, but I could be thinking about this wrong.
    password: process.env.DB_PASS, // same for password.
    database: process.env.DB_NAME, // the name of our database
    connectionLimit: 5 // limits the amount of connections to be made to MariaDB at one time, in this case, 5
});

// this is more or less error handling, but if no errors are encountered, we simply "release" the connection,
// this should be put in by default as it would make errors more human readable in the case of a production scale error
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

// and export the connection reference itself for use in ../routes/index.js
module.exports = pool;