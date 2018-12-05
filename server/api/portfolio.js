const router = require('express').Router();
const { Portfolio } = require('../db/models');
module.exports = router;

router.get('/:userId', async (req, res, next) => {
  try {
    const response = await Portfolio.findOne({
      where: { userId: req.params.userId }
    });
    const portfolio = response.dataValues;
    res.json(portfolio);
  } catch (err) {
    next(err);
  }
});

router.get('/:portfolioId/holdings', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.portfolioId);
    const holdings = await portfolio.getHoldings();
    res.json(holdings);
  } catch (error) {
    console.log(error);
  }
});

router.put(`/:userId`, async (req, res, next) => {
  try {
    let balance = 0;
    const { type, quantity, price } = req.body;
    const portfolio = await Portfolio.findOne({
      where: { userId: req.params.userId }
    });
    if (type.toString() === 'buy') {
      balance = portfolio.cash - quantity * price;
    } else {
      balance = portfolio.cash + quantity * price;
    }
    await Portfolio.update(
      { cash: balance },
      { where: { userId: req.params.userId } }
    );
    const newPortfolio = await Portfolio.findOne({
      where: { userId: req.params.userId }
    });
    res.json(newPortfolio);
  } catch (error) {
    next(error);
  }
});
