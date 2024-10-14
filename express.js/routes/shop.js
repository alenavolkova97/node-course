const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

router.get("/", (req, res, next) => {

  // slash / from here points to root operating system, not to the root folder of the project, so we can't use /views/shot.html
  // path send to sendFile should be absolute
  // __dirname - this is a global var, an absolute path on our operating system TO this project folder (to this current file)
  // path.join detects OS and build a correct path
  res.sendFile(path.join(rootDir, "views", "shop.html")); // don't ADD shashes / (slashes are different in different OS)

  // but we can also still use setHeaders and write
  // auto set "Content-Type", "text/html" if text
});

module.exports = router;
