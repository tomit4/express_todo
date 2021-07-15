const express = require("express");
const http = require("http");
const path = require("path");
const index = { router } = require("./routes/index");

const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
// Note that the ordering of our middleware is important, if for example there were two MOUNT points, then the first MOUNT point
// would take precedence over the second.

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, "public")));
// this creates a WRITE STREAM from "public" and passes that to the requested object, which is our main directory(?)...
app.use("/", index); // accesses and uses our index.js file from the main directory, this is our MOUNT POINT for the middleware
// followed by index.js in our routes subdirectory, this establishes this as the ExpressJS router.

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});