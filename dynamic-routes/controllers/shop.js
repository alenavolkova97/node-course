const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/products", { 
      prods: products,
      pageTitle: "All products",
      path: "/products",
    });
  });
};

// we normally don't use req.body for GET, we use dynamic routes
// but we can use both req.body and dynamic routes for other methods (e.g. POST)
exports.getProductPage = (req, res, next) => {
  const productId = req.params.productId; // dynamic part name after :

  Product.findById(productId, (product) => {
    res.render("shop/product-details", {
      product: product,
      pageTitle: product.title,
      path: "/products",
    });
  });
};

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", { 
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCartPage = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (product of products) { // to aviod loop in a loop we could store products as { [id]: {}, [id]: {}}
        const cartProduct = cart.products.find((item) => item.id === product.id); // when cart === null will be an error

        if (cartProduct) {
          cartProducts.push({ product: product, qty: cartProduct.qty });
        };
      };

      res.render("shop/cart", {
        cartProductsData: cartProducts,
        pageTitle: "Your cart",
        path: "/cart",
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  
  res.redirect("/cart");
};

exports.postDeleteProductFromCart = (req, res, next) => {
  const { productId } = req.body;
  
  Product.findById(productId, (product) => {
    Cart.deleteProduct(productId, product.price);

    res.redirect("/cart");
  });
};

exports.getCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};

exports.getOrdersPage = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your orders",
    path: "/orders",
  });
};
