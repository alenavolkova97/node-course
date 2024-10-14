const path = require("path");

const express = require("express");

const rootDir = require("../../mvc/utils/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  // console.log(adminData.products);

  const products = adminData.products;
  res.render("shop", { 
    prods: products,
    pageTitle: "Shop",
    path: "/",
    activeShop: true,
    productCss: true,
    // layout: false // if we set this then shop.hbs will NOT use default layout
  }); // express js method which uses default tepmp engine which is provided in app.js
});

module.exports = router;
