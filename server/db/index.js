const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/your_db_here');

module.exports = db;
