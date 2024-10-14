const mongodb = require("mongodb");

const { getDb } = require("../utils/database");

class Product {
  constructor(title, price, description, imageUrl, id, userId) { // as our object doesn't have _id mongodb creates _id auto for each document
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this._id = id ? new mongodb.ObjectId(`${id}`) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      dbOp = db.collection("products").updateOne({ _id: this._id }, { $set: this });
      // this for all fields = { title: this.title, ...}
      // not set this as a second arg as updateOne doesn't replace!
      // updateMany to update more than one
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp // we pass JS object, but it will be converted to JSON by mongodb
    // products collection will be created automatically if doesn't exist
    // insertMany([{}, {}]) => for more than one document
      // .then((insertResult) => {
      // })
      .catch((err) => console.log(err))
  }

  static fetchAll() {
    const db = getDb();
    // { title: "cat" } => can be used to filter
    return db.collection("products").find().toArray() // find => returns cursor
    // toArray = to get all documents and turn them into an array, use only if a lot of documents!
      .then((products) => {
        return products;
      })
      .catch((err) => console.log(err))
  }

  static findById(productId) {
    const db = getDb();

    // _id: ObjectId("670bc2299e46d8a42dbeedf5") => _id has ObjectId type
    return db.collection("products").find({ _id: new mongodb.ObjectId(`${productId}`) }).next() // next is the last document here
      .then((product) => {
        return product;
      })
      .catch((err) => console.log(err))

    // we could also use findOne with the same options to return promise
  }

  static deleteById(productId) {
    const db = getDb();

    return db.collection("products").deleteOne({ _id: new mongodb.ObjectId(`${productId}`) })
      // .then((deleteResult) => {}) // if I write empty function withoud return I will return undefined
      .catch((err) => console.log(err))
  }
}

module.exports = Product;
