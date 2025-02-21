const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("restaurant", "sqluser", "password", {
  host: "localhost",
  dialect: "mysql", 
});

module.exports = sequelize;