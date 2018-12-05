import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getHoldings,
  getUser,
  fetchPortfolio,
  getPrices,
  getSymbols
} from '../store/index';

const numberWithCommas = n => {
  const parts = n.toString().split('.');
  return (
    parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
    (parts[1] ? '.' + parts[1] : '')
  );
};

export class Portfolio extends Component {
  async componentDidMount() {
    try {
      await this.props.fetchPortfolio(this.props.user.id);
      await this.props.getHoldings(this.props.portfolio.id);
      await this.props.getSymbols(this.props.holdings);
      if (this.props.symbols.length) {
        await this.props.getPrices(this.props.symbols);
      }
      this.props.handleLoading();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return !this.props.loading ? (
      <div className="portfolio-section">
        <h1>
          Portfolio Value: $
          {(
            this.props.holdings.cash / 100 +
            this.props.symbols.reduce((value, symbol) => {
              return (
                value +
                this.props.holdings[symbol] *
                  this.props.prices[symbol.toUpperCase()].quote.latestPrice
              );
            }, 0)
          ).toFixed(2)}
        </h1>

        <ul className="list-group">
          <li>
            Cash: $
            {numberWithCommas((this.props.holdings.cash / 100).toFixed(2))}
          </li>
          {this.props.symbols
            .filter(symbol => {
              return this.props.holdings[symbol] !== 0;
            })
            .map(symbol => (
              <li
                key={symbol}
                className={
                  this.props.prices[symbol.toUpperCase()].quote.latestPrice ===
                  this.props.prices[symbol.toUpperCase()].quote.open
                    ? 'grey-price'
                    : this.props.prices[symbol.toUpperCase()].quote
                        .latestPrice <
                      this.props.prices[symbol.toUpperCase()].quote.open
                    ? 'red-price'
                    : 'green-price'
                }
              >
                {symbol.toUpperCase()} - {this.props.holdings[symbol]} @{' '}
                {this.props.prices[symbol.toUpperCase()].quote.latestPrice} =>{' '}
                {(
                  this.props.holdings[symbol] *
                  this.props.prices[symbol.toUpperCase()].quote.latestPrice
                ).toFixed(2)}
              </li>
            ))}
        </ul>
      </div>
    ) : (
      <h1>Loading</h1>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    portfolio: state.portfolio.portfolio,
    holdings: state.portfolio.holdings,
    symbols: state.portfolio.symbols,
    prices: state.portfolio.prices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => dispatch(getUser(user)),
    fetchPortfolio: userId => dispatch(fetchPortfolio(userId)),
    getHoldings: portfolio => dispatch(getHoldings(portfolio)),
    getSymbols: holdings => dispatch(getSymbols(holdings)),
    getPrices: symbols => dispatch(getPrices(symbols))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portfolio);
