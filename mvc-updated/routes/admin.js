const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/products", adminController.getProductsPage);

router.get("/add-product", adminController.getAddProductPage);

router.post("/add-product", adminController.postAddProduct);

module.exports = router;
