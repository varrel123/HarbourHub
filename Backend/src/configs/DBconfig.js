/**
 * Module that establishes a connection to a PostgreSQL database using the 'pg' library.
 * Exports a PostgreSQL database client for use in other parts of the application.
 *
 * @module db
 */

const { Client } = require('pg');

/**
 * PostgreSQL database client configuration.
 *
 * @type {Client}
 * @property {string} user - The username to connect to the database.
 * @property {string} host - The host where the database is located.
 * @property {string} database - The name of the database.
 * @property {string} password - The password to authenticate with the database.
 * @property {number} port - The port number to connect to the database.
 * @property {string} sslmode - The SSL mode for the connection.
 * @property {boolean} ssl - Whether SSL should be used for the connection.
 */
const db = new Client({
    user: 'mohammadvarrel23',
    host: 'ep-polished-water-013849.ap-southeast-1.aws.neon.tech',
    database: 'HarbourHUB',
    password: 'n2GKNID3iWsS',
    port: 5432,
    sslmode: 'require',
    ssl: true
});

/**
 * Establish a connection to the PostgreSQL database.
 *
 * @function
 * @param {function} callback - A callback function to handle the connection result.
 */
db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the database HarbourHUB');
    }
});

module.exports = db;
