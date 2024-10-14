const Product = require("../models/product");

// actions = controllers = middleware functions

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products", { 
        prods: products,
        pageTitle: "Admin products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getAddProductPage = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product", 
    path: "/admin/add-product",
    editing: false,
  })
};

exports.postAddProduct = (req, res, next) => {
  const { _id: userId } = req.user;
  const {title, imageUrl, description, price} = req.body;

  const product = new Product(title, price, description, imageUrl, null, userId);

  product.save()
    .then((result) => {
      console.log("Product has been created!");
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};

exports.getEditProductPage = (req, res, next) => {
  const { edit } = req.query;

  if (!edit) {
    return res.redirect("/");
  }

  const { productId } = req.params;

  Product.findById(productId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product", {
        editing: edit === "true",
        product,
        pageTitle: "Edit product", 
        path: null,
      });
    })
    .catch((err) => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;

  const updatedProduct = new Product(title, price, description, imageUrl, productId);

  updatedProduct.save()
    .then((updateResult) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;

  Product.deleteById(productId)
    .then((deleteResult) => {
      console.log("Product has been deleted!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

