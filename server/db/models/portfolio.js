const Sequelize = require('sequelize');
const db = require('../');
const Transaction = require('./transaction');

const Portfolio = db.define('portfolio', {
  cash: {
    type: Sequelize.INTEGER,
    defaultValue: 500000
  }
});

Portfolio.prototype.getHoldings = async function() {
  const transactions = await Transaction.findAll({
    where: { portfolioId: this.id }
  });
  const portfolioTotal = {};
  portfolioTotal.user = this.userId;
  portfolioTotal.cash = this.cash;
  transactions.map(element => {
    if (!portfolioTotal[element.ticker]) {
      portfolioTotal[element.ticker] =
        element.type === 'buy' ? element.quantity : -element.quantity;
    } else if (element.type === 'buy') {
      portfolioTotal[element.ticker] += element.quantity;
    } else {
      portfolioTotal[element.ticker] -= element.quantity;
    }
  });
  return portfolioTotal;
};

module.exports = Portfolio;
