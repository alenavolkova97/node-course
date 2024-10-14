const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");
const Cart = require("./cart");

// путь к хранилищу в виде файла
const p = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  // !! important to be arrow func as we need this keyword
  // err will be only if file doesn't exist (not empty!!)
  fs.readFile(p, (err, fileContent) => { // fileContent or data
    if (err) {
      return cb([]);
    }

    cb(JSON.parse(fileContent)); // JSON --> JS
    // JSON = helper object in node
  }); // read entire content of a file, we need to read streams if the file is big
};

module.exports = class Product {
  constructor(id, productTitle, imageUrl, description, price) {
    this.id = id;
    this.title = productTitle;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        // means this product was already saved => update existing product
        const existingProductIndex = products.findIndex((item) => item.id === this.id);

        products[existingProductIndex] = this;

        // writeFile alsays replace old content
        fs.writeFile(p, JSON.stringify(products), (err) => { // JS --> JSON
          console.log("error", err);
        });
      } else { // create
        this.id = Math.random().toString();
        products.push(this);
  
        fs.writeFile(p, JSON.stringify(products), (err) => { // JS --> JSON
          console.log("error", err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.id === id);
      cb(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      // const productIndex = products.findIndex((product) => product.id === id);
      // products.splice(productIndex, 1);

      const product = products.find((product) => product.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => { // JS --> JSON
        if (!err) {
          // also remove from cart
          Cart.deleteProduct(id, product.price);
        } else {
          console.log("error deleting product", err);
        }
      });
    });
  }
}
