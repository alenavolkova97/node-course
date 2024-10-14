const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

// 1 user <- cart -> many products
// carts table = корзины
const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  }
});

module.exports = Cart;
