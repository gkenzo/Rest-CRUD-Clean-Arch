const mysql = require("mysql2");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootpwd",
  port: 3306,
  database: "blog",
});

// con.connect((er) => {
//   if (er) throw er;
//   console.log("Database connected");
// });

module.exports = con;
