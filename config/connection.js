// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME  
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
  }
  else {
    connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'hacktheplanet',
      database: 'todoagain_db'
    });
  };
  console.log("connected as id " + connection.threadId);
});
connection.connect();

// Export connection for our ORM to use.
module.exports = connection;
