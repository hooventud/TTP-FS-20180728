const router = require('express').Router()
const {Transaction, Portfolio} = require('../db/models')
module.exports = router

const checkIfTransactionValid = (holdings, transactionRequest) => {
  if (transactionRequest.type === 'buy') {
    const purchasePrice = transactionRequest.qty * transactionRequest.price
    const canPurchase =
      purchasePrice <= holdings.Cash &&
      transactionRequest.qty > 0 &&
      transactionRequest.qty < 100000000
    return canPurchase
  } else if (transactionRequest.type === 'sell') {
    const sharesToSell = transactionRequest.qty
    const sharesOwned = holdings[transactionRequest.ticker]
    const canSell =
      sharesToSell <= sharesOwned &&
      transactionRequest.qty > 0 &&
      transactionRequest.qty < 100000000
    return canSell
  }
}

router.post('/', async (req, res, next) => {
  try {
    const {
      type,
      ticker,
      qty,
      price,
      portfolioId,
      holdings,
      userId
    } = req.body
    const validTransaction = checkIfTransactionValid(holdings, req.body)
    if (validTransaction) {
      await Transaction.create({
        type,
        ticker,
        qty,
        price
      }).then(transaction => {
        transaction.setPortfolio(portfolioId)
      })

      if (type === 'buy') {
        await Portfolio.update(
          {cash: holdings.Cash - qty * price},
          {where: userId}
        )
      }
      if (type === 'sell') {
        await Portfolio.update(
          {cash: holdings.Cash + qty * price},
          {where: userId}
        )
      }

      const successfulTransactionResponse = {
        message: 'Transaction confirmed'
      }
      res.json(successfulTransactionResponse)
    } else {
      const failedTransactionResponse = {
        message: 'Transaction failed due to inadequate holdings'
      }
      res.json(failedTransactionResponse)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:portfolioId', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        portfolioId: req.params.portfolioId
      }
    })
    res.json(transactions)
  } catch (error) {
    console.log(error)
  }
})