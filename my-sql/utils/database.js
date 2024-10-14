const mysql = require("mysql2");

// pool manages multiple connections,
// when we have query it gets new connection from pool
// when query is done connection will be handled back to pool and it's available again for a new query
// so we can run multiple queries simultaneously
const pool = mysql.createPool({
  host: "localhost", // because it is running on our local machine here
  user: "root",
  database: "node-course", // it gives access to database server which typically has multiple databases (shemas)
  password: "moonnight20",
});

module.exports = pool.promise();
// we will use promises instead of callbacks, so promise chains instead of nested callbacks
// but we could use callbacks, this is also possible
