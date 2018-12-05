import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchPortfolio,
  getHoldings,
  createTransaction,
  getSymbols,
  getPrices
} from '../store/index';

const numberWithCommas = n => {
  const parts = n.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
};

export class BuySell extends Component {
  constructor() {
    super();
    this.state = {
      ticker: '',
      quantity: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {}

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.props.handleLoading();
    const type = e.target.id;
    const portfolioId = this.props.portfolio.id;
    const holdings = this.props.holdings;
    const userId = this.props.user.id;
    const { ticker, quantity } = this.state;

    const transaction = {
      type,
      ticker,
      quantity,
      portfolioId,
      holdings,
      userId
    };
    await this.props.createTransaction(transaction);
    await this.props.fetchPortfolio(this.props.user.id);
    await this.props.getHoldings(this.props.portfolio.id);
    await this.props.getSymbols(this.props.holdings);
    await this.props.getPrices(this.props.symbols);
    this.props.handleLoading();
  }

  render() {
    return (
      <div className="buy-sell-section">
        <h3>
          Available Funds: $
          {numberWithCommas((this.props.holdings.cash / 100).toFixed(2))}
        </h3>
        <div className="card buy-sell">
          <form onChange={this.handleChange}>
            <div className="form-group">
              <label htmlFor="ticker">Ticker</label>
              <input
                className="form-control"
                id="ticker"
                placeholder="Enter ticker"
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
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
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="buy"
                  onClick={this.handleSubmit}
                >
                  Buy
                </button>
              </div>
              <div className="btn-group mr-2" role="group">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  id="sell"
                  onClick={this.handleSubmit}
                >
                  Sell
                </button>
              </div>
            </div>
            <span>{this.props.message}</span>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    holdings: state.portfolio.holdings,
    portfolio: state.portfolio.portfolio,
    symbols: state.portfolio.symbols,
    message: state.transaction.message
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPortfolio: userId => dispatch(fetchPortfolio(userId)),
    getHoldings: portfolioId => dispatch(getHoldings(portfolioId)),
    createTransaction: transaction => dispatch(createTransaction(transaction)),
    getSymbols: holdings => dispatch(getSymbols(holdings)),
    getPrices: symbols => dispatch(getPrices(symbols))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BuySell);
