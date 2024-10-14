const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundRoutes = require("./routes/404");

const { connectToMongo } = require("./utils/database");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
// app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use((req, res, next) => {
  User.findById("670bfe131f085bcce0d5f530")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id); // user is undefined by default
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(notFoundRoutes);

connectToMongo(() => {
  app.listen(3200);
});
