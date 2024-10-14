const Product = require("../models/product");

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/products", {
        prods: products,
        pageTitle: "All products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductPage = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCartPage = (req, res, next) => {
  req.user.getCart()
    .then((products) => {
      res.render("shop/cart", {
        products: products,
        pageTitle: "Your cart",
        path: "/cart",
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  
  Product.findById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((updateResult) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProductFromCart = (req, res, next) => {
  const { productId } = req.body;

  req.user.deleteProductFromCart(productId)
    .then((updateResult) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCreateOrder = (req, res, next) => {
  req.user.addOrder()
    .then((cleanCartResult) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrdersPage = (req, res, next) => {
  req.user.getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        orders: orders,
        pageTitle: "Your orders",
        path: "/orders",
      });
    })
    .catch((err) => console.log(err));
};
