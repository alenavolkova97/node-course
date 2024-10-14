const Product = require("../models/product");

// actions = controllers = middleware functions

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
  res.render("admin/edit-product", {
    pageTitle: "Add product", 
    path: "/admin/add-product",
    editing: false,
  })
};

exports.postAddProduct = (req, res, next) => {
  const {title, imageUrl, description, price} = req.body;

  const product = new Product(null, title, imageUrl, description, price);
  product.save();

  res.redirect("/");
};

exports.getEditProductPage = (req, res, next) => {
  const { edit } = req.query; // "true" as value always is a string

  if (!edit) {
    return res.redirect("/");
  }

  const { productId } = req.params;

  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      editing: edit === "true", // convert to boolean
      product,
      pageTitle: "Edit product", 
      path: null,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;

  const product = new Product(productId, title, imageUrl, description, price);

  product.save();

  res.redirect("/admin/products");
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  Product.deleteById(productId);

  res.redirect("/admin/products");
};

