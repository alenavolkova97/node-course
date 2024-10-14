const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

// product + quantity + cart where it lies
const CartItem = sequelize.define("cartItem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = CartItem;
