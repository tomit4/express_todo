const express = require("express");
const pool = require('../helpers/database');
const router = express.Router();

// The router object provides methods that correspond with the HTTP protocol verbs (ie GET, POST, PUT, PATCH, and DELETE)
// Note that this router object is what is exported to app.js as middleware, but is also establishing the route to the website

router.get("/", (req, res) => { // posting a GET request for the main directory
    // The following sends out whatever html we pass to it
    res.sendFile(__dirname + "/index.html");

});

router.get("/favicon.ico", (req, res) => { // sets the favicon icon.
    res.sendFile(__dirname + "/images/todo_favicon.png");
});

router.get('/maria_database', async function(req, res) {
    try {
        const sqlQuery = 'SELECT * FROM to_do'; // perhaps allow user to choose from databases at login page.
        const rows = await pool.query(sqlQuery);
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/maria_database', async function(req, res) {
    try {
        const { listArray } = req.body;

        const sqlQuery = 'INSERT INTO to_do (task) VALUES (?)';

        const result = await pool.query(sqlQuery, [listArray]);

        res.status(200).json(result.body);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

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

router.put('/maria_database', async function(req, res) {
    try {

        const { updated_to_do, previous_to_do } = req.body;

        const sqlQuery = "UPDATE to_do SET task = (?) WHERE task = (?) ORDER BY id ASC LIMIT 1";

        const result = await pool.query(sqlQuery, [updated_to_do, previous_to_do]);

        res.status(200).json(result.body);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;