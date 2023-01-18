const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const passcode = require("./routes/authentication");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Importing routes
app.use("/api/v1", passcode);

module.exports = app;
