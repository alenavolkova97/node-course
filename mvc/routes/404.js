const express = require("express");

const pageNotFoundController = require("../controllers/404");

const router = express.Router();

router.use(pageNotFoundController.getPageNotFoundPage);

module.exports = router;
