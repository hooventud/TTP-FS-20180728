import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setHoldings, getUser, getTransactions } from '../store/index';
import Header from './Header';

export class Transactions extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    try {
      await this.props.getTransactions(this.props.portfolio.id);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="transactions-section">
          <h1>Transactions</h1>

          {this.props.transactions.length ? (
            <ul className="list-group">
              {this.props.transactions.map(trans => {
                return (
                  <li className="list-group-item" key={trans.id}>
                    {trans.type.toUpperCase()} ({trans.ticker.toUpperCase()}) -{' '}
                    {trans.quantity} {trans.quantity > 1 ? 'Shares' : 'Share'} @{' '}
                    {(trans.price / 100).toFixed(2)} at {trans.createdAt}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>No Transaction History</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    portfolio: state.portfolio.portfolio,
    holdings: state.portfolio.holdings,
    transactions: state.transaction.transactions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => dispatch(getUser(user)),
    setHoldings: portfolio => dispatch(setHoldings(portfolio)),
    getTransactions: portfolioId => dispatch(getTransactions(portfolioId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);
