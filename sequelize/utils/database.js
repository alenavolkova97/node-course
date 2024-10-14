const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-course", "root", "moonnight20", { 
  dialect: "mysql",
  host: "localhost" // localhost is a default one so we could skip it
}); // to connect to the database => sequelize behind the scenes do similar to what we did in my-sql,
    // so set up connection pool but managed by sequelize that gives us all sequelize features

module.exports = sequelize; // also works with promises
