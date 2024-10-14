const fs = require('fs');
const path = require('path');

const rootDir = require("../utils/path");

const p = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, price) {
    // fetch prev cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0};

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      // check if already exist
      const existingProductIndex = cart.products.findIndex((item) => item.id === id);
      const existingProduct = cart.products[existingProductIndex];
      
      // increase quantity
      if (existingProduct) {
        cart.products[existingProductIndex] = {...existingProduct, qty: existingProduct.qty + 1};
      // add product
      } else {
        cart.products.push({ id: id, qty: 1 });
      }

      cart.totalPrice += Number(price);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log("error writing new cart", err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      const cart = JSON.parse(fileContent);
      const product = cart.products.find((item) => item.id === id);

      if (!product) {
        return;
      }

      // const updatedCart = {
      //   products: cart.products.filter((item) => item.id !== id),
      //   totalPrice: cart.totalPrice - price * qty,
      // };

      cart.products = cart.products.filter((item) => item.id !== id);
      cart.totalPrice -= (price * product.qty);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log("error writing new cart", err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);

      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
}
