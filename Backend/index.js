/**
 * A index.js application that sets up an Express.js server with various middleware.
 *
 * The server listens on a specified port and handles routes using Express.js, manages sessions,
 * and enables Cross-Origin Resource Sharing (CORS) for all origins.
 *
 * @requires express
 * @requires body-parser
 * @requires express-session
 * @requires cors
 * @requires HB_Route from './src/routes/routes'
 * @requires session.MemoryStore
 */

// Import required libraries
const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const session = require('express-session');
const cors = require('cors');
const HB_Route = require('./src/routes/routes');
const store = new session.MemoryStore();
const app = express();

// CORS configuration
const corsOptions = {
    origin: '*',
    Credentials: true,
    optionsSuccessStatus: 200
};

/**
 * Express.js session middleware configuration.
 *
 * @param {Object} sessionOptions - Session configuration options.
 * @param {string} sessionOptions.secret - A secret key for session data encryption.
 * @param {boolean} sessionOptions.resave - Whether to save the session data for every request.
 * @param {Object} sessionOptions.cookie - Cookie configuration for session.
 * @param {number} sessionOptions.cookie.maxAge - Maximum age (in milliseconds) of the session cookie.
 * @param {boolean} sessionOptions.saveUninitialized - Whether to save an uninitialized session.
 * @param {Object} sessionOptions.store - Session store to save session data (in this case, MemoryStore).
 */
app.use(session({
    secret: 'secret',
    resave: false,
    cookie: { maxAge: 1800000 }, // 1800000 milliseconds = 30 minutes
    saveUninitialized: false,
    store
}));

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Parse incoming JSON data
app.use(bodyParser.json());

// Parse incoming URL-encoded data with extended option
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Handle a GET request to the root path.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 */
app.get('/', (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.send('Not logged in');
    }
});

// Use the HB_Route for handling additional routes
app.use(HB_Route);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log('Server is running on port: ' + port);
});
