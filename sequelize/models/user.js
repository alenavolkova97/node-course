const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

module.exports = sequelize.define("user", {
  id : {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
})
