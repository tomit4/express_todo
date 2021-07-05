const express = require("express");
const cookieParser = require("cookie-parser");
const router = express.Router();
const path = require('path');

const app = express();
// The router object provides methods that correspond with the HTTP protocol verbs (ie GET, POST, PUT, PATCH, and DELETE)
// Note that this router object is what is exported to app.js as middleware, but is also establishing the route to the website

app.use(cookieParser());

router.get("/", (req, res) => { // posting a GET request for the main directory
    // let title = "Do Your Thang!"; // creating a variable that is meant to be the title of the website called "Express"
    // The following sends out whatever html we pass to it
    res.sendFile(__dirname + "/index.html");

});

router.get("/favicon.ico", (req, res) => { // sets the favicon icon.
    res.sendFile(__dirname + "/images/todo_favicon.png");
});

router.get("/my_list", (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'my_list.html'));
})

// We then export the object returned by the object to our app.js file where it is used within the app.use("/", index) middleware function.
module.exports = router;