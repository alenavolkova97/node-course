const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  // sendFile will auto set content-Type header 
  res.sendFile(path.join(rootDir, "views", "add-product.html")); // if sending a response it means we don't want to execute next after it
});
// __dirname, "..", "views", "add-product.html" also possible
// __dirname, "../", "views", "add-product.html" also possible

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
