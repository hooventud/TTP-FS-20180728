const Sequelize = require('sequelize');
const db = require('../');

const Transaction = db.define('transaction', {
  type: {
    type: Sequelize.ENUM('buy', 'sell')
  },
  ticker: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  price: {
    type: Sequelize.INTEGER
  }
});

module.exports = Transaction;
