const express = require("express");
const pool = require('../helpers/database');
const router = express.Router();
const path = require('path');

// The router object provides methods that correspond with the HTTP protocol verbs (ie GET, POST, PUT, PATCH, and DELETE)
// Note that this router object is what is exported to app.js as middleware, but is also establishing the route to the website

router.get("/", (req, res) => { // posting a GET request for the main directory
    // The following sends out whatever html we pass to it
    res.sendFile(__dirname + "/index.html");

});

router.get("/favicon.ico", (req, res) => { // sets the favicon icon.
    res.sendFile(__dirname + "/images/todo_favicon.png");
});

router.get("/my_list", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'my_list.html'));
})

router.get('/maria_database', async function (req, res) {
    try {
        // const sqlQuery = 'SELECT id, task FROM tasks WHERE id=?';
        const sqlQuery = 'SELECT * FROM to_do'; // perhaps allow user to choose from databases at login page.
        const rows = await pool.query(sqlQuery, req.params.id);
        res.status(200).json(rows);
    }
    catch(error) {
        res.status(400).send(error.message);
    }
});

router.post('/maria_database', async function(req, res) {
    try{
        const { id, task } = req.body;

        const sqlQuery = 'INSERT INTO to_do (id, task) VALUES (?,?)';

        const result = await pool.query(sqlQuery, [id, task]);

        res.status(200).json(result.body);
    } catch(error) {
        res.status(400).send(error.message)
    }
})

// We then export the object returned by the object to our app.js file where it is used within the app.use("/", index) middleware function.
module.exports = router;