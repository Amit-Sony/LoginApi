const app = require("./app");
const dotenv = require("dotenv");
const dbConnection = require("./config/database");
const port = process.env.PORT || 4000;

//importing config file
dotenv.config({ path: "./config/config.env" });

//coneecting database
dbConnection();
app.listen(port, () => {
  console.log(`Server running at port no. ${port}`);
});
