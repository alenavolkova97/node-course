const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add product", 
    path: "/admin/add-product",
    productCss: true,
    formsCss: true,
    activeAddProduct: true,
  })
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();

  res.redirect("/");
};

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop", { 
      prods: products,
      pageTitle: "Shop",
      path: "/",
      activeShop: true,
      productCss: true,
    });
  });
};
