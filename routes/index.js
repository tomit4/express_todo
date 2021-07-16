const express = require("express"); // ah, good ol' express, making things easier
const pool = require('../helpers/database'); // importing our MariaDB module settings, referencing our pool/connection
const router = express.Router(); // utilizing express's Router() method for API requests

// The router object provides methods that correspond with the HTTP protocol verbs (ie GET, POST, PUT, PATCH, and DELETE)
// Note that this router object is what is exported to app.js as middleware, but is also establishing the route to the website

// GET the index.html file and render it at "/" directory
router.get("/", (req, res) => { 
    res.sendFile(__dirname + "/index.html");
});

// Display our little clipboard favicon icon, referenced from our index.html page
router.get("/favicon.ico", (req, res) => { // sets the favicon icon.
    res.sendFile(__dirname + "/images/todo_favicon.png");
});

// our main GET request that sends the JSON data to the subdirectory "/maria_database", from here index.html can reference
// the data received by utilizing the listworks.js file in its <script> tag.
router.get('/maria_database', async function(req, res) {
    try {
        const sqlQuery = 'SELECT * FROM to_do'; 
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// The main POST request received from listworks.js's fetch POST request.
router.post('/maria_database', async function(req, res) {
    try {
        const { listArray } = req.body; // destructures the listArray passed from our fetch POST request's body

        const sqlQuery = 'INSERT INTO to_do (task) VALUES (?)'; // note the ? is looking for a paramater passed.

        const result = await pool.query(sqlQuery, [listArray]); // npm's MariaDB module takes in a query and then passes an array of parameters to the ? above.

        res.status(200).json(result.body); // and resolves the JSON upon an OK response to the /maria_database
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// The DELETE request, once again, received from listworks.js's fetch DELETE request.
router.delete('/maria_database', async function(req, res) {
    try {
        const { deletedItem } = req.body;

        const sqlQuery = "DELETE FROM to_do WHERE (task) = (?) ORDER BY id DESC LIMIT 1";
        // even if the task string is identical to another one, it will only delete one.
        // desc/asc is not a good way of doing this in large scale application however, as it is not specific enough, we need a uuid

        const result = await pool.query(sqlQuery, [deletedItem]);

        res.status(200).json(result.body);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

// The PUT request allows us to UPDATE a single item
router.put('/maria_database', async function(req, res) {
    try {

        const { updated_to_do, previous_to_do } = req.body; // the order probably doesn't matter here, as they are referencing the specific JSON returned by the fetch PUT request in listworks.js

        const sqlQuery = "UPDATE to_do SET task = (?) WHERE task = (?) ORDER BY id ASC LIMIT 1"; // Note the order of the parameters will be passed in the order of await.pool.query() below

        const result = await pool.query(sqlQuery, [updated_to_do, previous_to_do]);

        res.status(200).json(result.body);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

//exports the router to be referenced from our server, app.js
module.exports = router;