const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProductsPage = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, tableData]) => {
      res.render("shop/products", { 
        prods: rows,
        pageTitle: "All products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProductPage = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId)
    .then(([rows, tableData]) => {
      res.render("shop/product-details", {
        product: rows[0],
        pageTitle: rows[0].title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, tableData]) => {
      res.render("shop/index", { 
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCartPage = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];

      for (product of products) {
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
