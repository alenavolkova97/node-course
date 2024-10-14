const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Product = sequelize.define("product", { // structure of model & database table
  id: {
    type: Sequelize.INTEGER, // now tend to use UUID => string
    autoIncrement: true,
    allowNull: false, // not empty
    primaryKey: true,
    // unique, no negative ?
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}); // to define a new model

module.exports = Product;
