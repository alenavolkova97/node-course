const mongodb = require("mongodb");

const { getDb } = require("../utils/database");
const Product = require("./product");

class User {
  constructor(username, email, cart, id) {
    this._id = id;
    this.name = username;
    this.email = email;
    this.cart = cart; // { items: [] }
  }

  save() {
    const db = getDb();

    return db.collection("users").insertOne(this);
      // .then((insertResult) => {
      //   console.log(insertResult);
      //   return insertResult;
      // })
      // .catch((err) => console.log(err));
  }

  getCart() {
    const db = getDb();

    const productIds = [];
    const productIdToQuantity = {};

    this.cart.items.forEach(({ productId, quantity }) => {
      productIds.push(productId);
      productIdToQuantity[productId] = quantity;
    });

    // productIds = array if ids
    return db.collection("products").find({ _id: { $in: productIds }}).toArray()
    .then((products) => {
        // products.length = 0, then reset the cart
        // if productIds.length > products.length => means that some products were removed and we need to match products with cart items
        // to remove removed products from the cart
        return products.map((product) => ({
          ...product,
          quantity: productIdToQuantity[product._id]
        }))
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((item) => item.productId.toString() === product._id.toString());
    const cartItems = this.cart.items;

    if (cartProductIndex === -1) {
      cartItems.push({ productId: product._id, quantity: 1 });
    } else {
      cartItems[cartProductIndex].quantity +=  1;
    }

    const db = getDb();

    return db.collection("users").updateOne({ _id: new mongodb.ObjectId(`${this._id}`) }, { $set: { cart: { items: cartItems } } });
  }

  deleteProductFromCart(productId) {
    const db = getDb();

    const updatedCartItems = this.cart.items.filter((item) => item.productId.toString() !== productId.toString());

    return db.collection("users").updateOne({ _id: new mongodb.ObjectId(`${this._id}`) }, { $set: { cart: { items: updatedCartItems } }});
  }

  addOrder() {
    const db = getDb();

    return this.getCart()
      .then((products) => {
        const order = {
          items: products, // [ { ...product, quantity }, ... ]
          user: {
            _id: new mongodb.ObjectId(`${this._id}`),
            name: this.name,
          }
        }

          return db.collection("orders").insertOne(order)
      })
      .then((insertResult) => {
        this.cart.items = [];

        return db.collection("users").updateOne({ _id: new mongodb.ObjectId(`${this._id}`) },  { $set: { cart: { items: [] } } });
      });
  }

  getOrders() {
    const db = getDb();

    return db.collection("orders").find({ "user._id": new mongodb.ObjectId(`${this._id}`) }).toArray();
  }

  static findById(userId) {
    const db = getDb();

    return db.collection("users").findOne({ _id: new mongodb.ObjectId(`${userId}`) })
      // .then((user) => {
      //   return user;
      // })
      // .catch((err) => console.log(err));
  }
}

module.exports = User;
