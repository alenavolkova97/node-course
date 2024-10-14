const path = require("path");

const express = require("express");

const rootDir = require("../utils/path");

const router = express.Router();

console.log(rootDir);

router.get("/", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "app.html"));
});

module.exports = router;
