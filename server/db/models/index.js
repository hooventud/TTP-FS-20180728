const Portfolio = require('./portfolio');
const User = require('./user');
const Transaction = require('./transaction');

Portfolio.belongsTo(User);

Portfolio.hasMany(Transaction);
Transaction.belongsTo(Portfolio);

module.exports = {
  User,
  Portfolio,
  Transaction,
};
