const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundRoutes = require("./routes/404");
// const db = require("./utils/database"); // this is a pool

// db.execute("SELECT * FROM products") // execute is safer than query method
//   .then((result) => {
//     console.log(result[0], result [1]); // result is [] with 2 el, 1 - [{}], 2 - [with metadata]
//   })
//   .catch((err) => {
//     console.log(err);
//   }); // in case of error
// // when execute query we get promise back so we can use then

const app = express();

app.set("view engine", "ejs");
// app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(notFoundRoutes);

app.listen(3200);
