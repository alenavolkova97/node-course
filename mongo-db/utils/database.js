const mongodb = require("mongodb");

const mongoClient = mongodb.MongoClient;

let _db;

const connectToMongo = (cb) => {
  mongoClient.connect("mongodb+srv://sendtoalenavolkova:Sa9MHXjGPWg6q1ap@cluster0.6pbus.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0")
  .then((client) => {
    console.log("Connected!");
    _db = client.db();
    cb();
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "No database found!";
};

exports.connectToMongo = connectToMongo;
exports.getDb = getDb;
