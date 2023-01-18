const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(console.log("Database connection sucessfull"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnection;
