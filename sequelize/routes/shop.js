const express = require("express");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get("/products", shopController.getProductsPage);

// if we need similar route with non dynamic part e.g /products/delete then this one should go first as this is more specific one
router.get("/products/:productId", shopController.getProductPage); // dynamic part can have any name e.g :id

router.get("/cart", shopController.getCartPage);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postDeleteProductFromCart);

router.post("/create-order", shopController.postCreateOrder);

router.get("/orders", shopController.getOrdersPage);

router.get("/checkout", shopController.getCheckoutPage);

router.get("/", shopController.getIndexPage);

module.exports = router;
