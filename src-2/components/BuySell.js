//Cash Value as header
//Cash - $5000.00
//Input for ticker
//Input for quantity
//Button for buy
//Button for sell
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../store';

export class BuySell extends Component {
  render() {
    return (
      <div className="buy-sell-section">
        <h1>Cash - {}}</h1>
        <div className="card buy-sell">
          <form>
            <div className="form-group">
              <label for="ticker">Ticker</label>
              <input
                className="form-control"
                id="ticker"
                placeholder="Enter ticker"
              />
            </div>
            <div class="form-group">
              <label for="quantity">Quantity</label>
              <input
                id="quantity"
                className="form-control"
                placeholder="Enter quantity"
              />
            </div>
            <div
              className="btn-toolbar"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div className="btn-group mr-2" role="group">
                <button type="submit" className="btn btn-primary">
                  Buy
                </button>
              </div>
              <div className="btn-group mr-2" role="group">
                <button type="submit" className="btn btn-secondary">
                  Sell
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions,
    portfolio: state.portfolio,
    holdings: state.portfolio.holdings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTransactions: async portfolioId => {
      dispatch(getTransactions(portfolioId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuySell);
