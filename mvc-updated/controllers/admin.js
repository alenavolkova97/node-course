const Product = require("../models/product");

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", { 
      prods: products,
      pageTitle: "Admin products",
      path: "/admin/products",
    });
  });
};

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add product", 
    path: "/admin/add-product",
  })
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, description, price} = req.body;

  const product = new Product(title, imageUrl, description, price);
  product.save();

  res.redirect("/");
};
