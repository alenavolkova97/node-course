const Product = require("../models/product");

exports.getProductsPage = (req, res, next) => {
  Product.findAll()
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

  Product.findById(productId) // replaced by findByPk() in version 5
    .then((product) => {
      res.render("shop/product-details", {
        product: product,
        pageTitle: product.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));

  // // another way of doing the same
  // Product.findAll({
  //   where: {
  //     id: productId,
  //   }
  // }).then((products) => { // findAll always give an array
  //   res.render("shop/product-details", {
  //     product: products[0],
  //     pageTitle: products[0].title,
  //     path: "/products",
  //   });
  // })
  // .catch((err) => console.log(err));
};

exports.getIndexPage = (req, res, next) => {
  Product.findAll()
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
    .then((cart) => {
      return cart.getProducts() // sequelize will look at CartItem
    })
    .then((products) => {
      res.render("shop/cart", {
        products: products, // quantity -> we will get as product.cartItem.quantity in a view
        pageTitle: "Your cart",
        path: "/cart",
      });
    })
    .catch((err) => console.log(err))
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  let userCart;
  let newQuantity = 1;
  
  req.user.getCart()
    .then((cart) => {
      userCart = cart;

      return cart.getProducts({ where: { id: productId }});
    })
    .then((cartProducts) => {
      if (cartProducts[0]) {
        const oldQuantity = cartProducts[0].cartItem.quantity;
        newQuantity = oldQuantity + 1;

        return cartProducts[0];
      }

      return Product.findById(productId);
    })
    .then((product) => {
      // update if data is already existing or create a new record if no corresponding data = upsert
      return userCart.addProduct(product, { through: { quantity: newQuantity } }); // will be added to intermediate table
    })
    .then((addOrUpdateProductResult) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err))
};

exports.postDeleteProductFromCart = (req, res, next) => {
  const { productId } = req.body;
  
  req.user.getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } })
    })
    .then((products) => {
      return products[0].cartItem.destroy(); // remove from cartItem table
    })
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err))
};

exports.postCreateOrder = (req, res, next) => {
  let prods;
  let userCart;

  req.user.getCart()
    .then((cart) => {
      userCart = cart;
      
      return cart.getProducts();
    })
    .then((products) => {
      prods = products;

      return req.user.createOrder();
    })
    .then((order) => {
      const modifiedProducts = prods.map((product) => { // we should add { through: { quantity: ? } } but we don't know quantity
        product.orderItem = { quantity: product.cartItem.quantity };

        return product;
      });

      return order.addProducts(modifiedProducts);
    })
    .then((result) => {
      return userCart.setProducts(null);
    })
    .then((cleanCartResult) => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getOrdersPage = (req, res, next) => {
  // also include products array per order, this only works because we have relation orders -> products
  req.user.getOrders({ include: ["products"] }) // eager loading concept = нетерпеливая загрузка
    .then((orders) => {
      res.render("shop/orders", {
        orders: orders,
        pageTitle: "Your orders",
        path: "/orders",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCheckoutPage = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
