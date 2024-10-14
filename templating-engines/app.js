const http = require("http");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// const expressHbs = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundRoutes = require("./routes/404");

const app = express(); // app is a requestHandler

// app.engine(
//     "hbs", // applies to all except layouts
//     expressHbs({layoutsDir: "views/layouts", defaultLayout: "main-layout", extname: "hbs"}) // extname applies to layouts only
// ); // "views/layouts" is a default layoutsDir so no need to set it

app.set("view engine", "ejs"); // set which templating engine to use to render dynamic templates
app.set("views", "views"); // set where to find your views - it is /views folder by default

// parser
app.use(bodyParser.urlencoded({extended: false})); // it set middleware in app.use and at the end of this middleware code we have next();

app.use(express.static(path.join(__dirname, "public")));

// route handling middlewares are below

app.use("/admin", adminData.routes); // adminRoutes = middleware
app.use(shopRoutes);
app.use(notFoundRoutes);

app.listen(3200);

// app.use can skip the first arg, when app.get and others can't

// we can just use app.listen(3200) for http
// const server = http.createServer(app);
// server.listen(3200);

// next(); allows the request to continue to the next middleware - if we don't call next then we need to send a response
// slash / is a default path

// // более "узкий" URL должен располагаться выше
// app.use("/add-product", (req, res, next) => {
//   res.send('<html><body><form action="/product" method="POST"><input type="text" name="product"/><button type="submit">Add product</button></form></body></html>'); // if sending a response it means we don't want to execute next after it
// });

// app.post("/product", (req, res, next) => {
//   console.log(req.body);
//   res.redirect("/");
// });

// app.use("/", (req, res, next) => {
//   res.send("<h1>Hello from express</h1>");
//   // but we can also still use setHeaders and write
//   // auto set "Content-Type", "text/html" if text
// });

// use work with all http methods
// use is NOT exact path, while get/post etc. are DO exact!!!
