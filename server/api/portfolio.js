const router = require('express').Router();
const { Portfolio, User } = require('../db/models');
module.exports = router;

router.get('/:userId', async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findOne({
      where: { userId: req.params.userId }
    });

    res.json(portfolio);
  } catch (err) {
    next(err);
  }
});

router.post('/:userId', async (req, res, next) => {
  console.log(req.params.userId);
  try {
    const portfolio = await Portfolio.create({ userId: req.params.userId });
    res.json(portfolio);
  } catch (error) {
    console.log(error);
  }
});

router.put(`/:userId`, async (req, res, next) => {
  try {
    let balance = 0;
    const { type, qty, price } = req.body;
    const portfolio = await Portfolio.findOne({
      where: { userId: req.params.userId }
    });
    if (type.toString() === 'buy') {
      balance = portfolio.cash - qty * price;
    } else {
      balance = portfolio.cash + qty * price;
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
