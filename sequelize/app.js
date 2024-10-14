const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const notFoundRoutes = require("./routes/404");
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
// app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use((req, res, next) => {
  User.findById(1)
    .then((user) => {
      req.user = user; // user is undefined by default
      next();
    })
    .catch((err) => console.log(err));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(notFoundRoutes);

// PRODUCT + USER relation
// ONE-TO-MANY

// user creates product
// onDelete => what happens to products if user is deleted,
// CASCADE => they will also be removed, constraints: true => confirming this should happen
// onUpdate CASCADE is a default
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // constraints
User.hasMany(Product); // set getters/setters => getProducts, createProduct

// PRODUCT + USER + CART relations

// ONE-TO-ONE
Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // add userId to the cart
User.hasOne(Cart); // => getCart, createCart

// MANY-TO-MANY -> through = intermediate / in-between / JOIN table with productIds and cardIds
Cart.belongsToMany(Product, { through: CartItem }); // we want to add many productId to the cart // getProducts, addProduct, addProducts, setProducts
Product.belongsToMany(Cart, { through: CartItem }); // we want to add many cartId to the product

// PRODUCT + USER + ORDER relations

// order-belongs-to-one-user
Order.belongsTo(User, { constraints: true, onDelete: "CASCADE"});
User.hasMany(Order); // => getOrders, createOrder

Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

sequelize.sync() // { force: true } we don't use force in prod, only for dev
  .then((result) => {
    // console.log(result);
    return User.findById(1);
  })
  .then((user) => {
    if (!user) { // user === null
      return User.create({
        name: "Alena",
        email: "test-email@test.com"
      });
    }

    // we can skip return Promise.resolve(user) here as if then block returns a value then it is auto wrapped in Promise
    return user;
  })
  .then((createdOrExistingUser) => {
    // console.log(createdOrExistingUser);
    createdOrExistingUser.getCart()
      .then((cart) => {
        if (cart) {
          return cart;
        }
    
        return createdOrExistingUser.createCart();
    })
  })
  .then((createdOrExistingCart) => {
    app.listen(3200);
  })
  .catch((err) => console.log(err));
// sync models to the database by creating tables (and relations if you have them),
// so it looks at all models you defined and create tables (and relations) for them when we start the app
// when we rerun the app it will not override existing table because of the IF NOT EXISTS check
