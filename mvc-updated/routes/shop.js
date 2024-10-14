const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/products", shopController.getProductsPage);

router.get("/cart", shopController.getCartPage);

router.get("/checkout", shopController.getCheckoutPage);

router.get("/orders", shopController.getOrdersPage);

router.get("/", shopController.getIndexPage);

module.exports = router;
