const router = require('express').Router();
const { Transaction, Portfolio } = require('../db/models');
module.exports = router;

const checkIfTransactionValid = (holdings, transactionRequest) => {
  if (transactionRequest.type === 'buy') {
    const purchasePrice =
      transactionRequest.quantity * transactionRequest.price;
    const canPurchase =
      purchasePrice <= holdings.cash &&
      transactionRequest.quantity > 0 &&
      transactionRequest.quantity < 100000000;
    return canPurchase;
  } else if (transactionRequest.type === 'sell') {
    const sharesToSell = transactionRequest.quantity;
    const sharesOwned = holdings[transactionRequest.ticker];
    const canSell =
      sharesToSell <= sharesOwned &&
      transactionRequest.quantity > 0 &&
      transactionRequest.quantity < 100000000;
    return canSell;
  }
};

router.get('/:portfolioId', async (req, res, next) => {
  try {
    const response = await Transaction.findAll({
      where: { portfolioId: req.params.portfolioId }
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {
      type,
      ticker,
      quantity,
      price,
      portfolioId,
      holdings,
      userId
    } = req.body;
    const validTransaction = checkIfTransactionValid(holdings, req.body);
    if (validTransaction) {
      await Transaction.create({
        type,
        ticker,
        quantity,
        price
      }).then(transaction => {
        transaction.setPortfolio(portfolioId);
      });

      if (type === 'buy') {
        await Portfolio.update(
          { cash: holdings.cash - quantity * price },
          { where: { userId: userId } }
        );
      }
      if (type === 'sell') {
        await Portfolio.update(
          { cash: holdings.cash + quantity * price },
          { where: { userId: userId } }
        );
      }

      const successfulTransactionResponse = {
        message: 'Transaction confirmed'
      };
      res.json(successfulTransactionResponse);
    } else {
      const failedTransactionResponse = {
        message: 'Transaction failed due to inadequate holdings'
      };
      res.json(failedTransactionResponse);
    }
  } catch (error) {
    console.log(error);
  }
});
