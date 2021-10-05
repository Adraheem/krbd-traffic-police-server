const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

// connect to database
const con = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
  multipleStatements: true,
  charset: "utf8mb4",
});

module.exports = con;
