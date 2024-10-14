const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log(req.url, "middleware 1");
//   next();
// });

// app.use((req, res, next) => {
//   console.log(req.url, "middleware 2");
//   res.send("<div>Hello Alena!</div>");
// });

app.use("/users", (req, res, next) => { //works for /users/abc and doesn't work for /users-abc
  res.send("<div>/users response</div>");
});

app.use("/", (req, res, next) => {
  res.send("<div>/ response</div>");
});

app.listen(3200);
