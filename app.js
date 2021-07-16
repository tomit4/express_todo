// This is the hub from where our application is called using node app.js (or nodemon app.js, or in this case I created a script in
// the package.json file called todo, so... npm run todo)

// This kind of file has shown up in so many tutorials and walkthroughs, sometimes it's called server.js, most of the time app.js
// It basically brings in express, http, path, and points to a routes or router folder where our router.js, or in this case index.js
// file can be found that points further to other subdirectories with data.  Again, this is more or less the hub or main access point to
// our application.

const express = require("express");
const http = require("http");
const path = require("path");
const index = { router } = require("./routes/index"); // destructures the router exported from routes/index.js

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
// Note that the ordering of our middleware is important, if for example there were two MOUNT points, then the first MOUNT point
// would take precedence over the second.

app.use(express.json()); // necessary for express to accept and parse JSON on the server side.

app.use(express.urlencoded({ // 
    extended: false
}));
// app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, "public")));
// this creates a WRITE STREAM from "public" and passes that to the requested object, which is our main directory(?)...

app.use("/", index); // accesses and uses our index.js file from the main directory, this is our MOUNT POINT for the middleware
// followed by index.js in our routes subdirectory, this establishes this as the ExpressJS router.

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});