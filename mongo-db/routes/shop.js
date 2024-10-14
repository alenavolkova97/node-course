const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/products", shopController.getProductsPage);

router.get("/products/:productId", shopController.getProductPage);

router.get("/cart", shopController.getCartPage);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postDeleteProductFromCart);

router.post("/create-order", shopController.postCreateOrder);

router.get("/orders", shopController.getOrdersPage);

router.get("/", shopController.getIndexPage);

module.exports = router;
