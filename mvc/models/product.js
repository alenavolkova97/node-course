const fs = require("fs");
const path = require("path");

const rootDir = require("../utils/path");

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
  constructor(t) {
      this.title = t;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => { // JS --> JSON
        console.log("error", err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
}
