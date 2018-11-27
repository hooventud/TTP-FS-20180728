//Header just says Transactions
//Line items for transactions
// ex. BUY (AAPL) - 6 Shares @ 300.00 - Date?
// SELL (AAPL) - 6 Shares @ 300.00 - Date?
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTransactions } from '../store';

export class Transactions extends Component {
  render() {
    return (
      <div className="transactions-section">
        <h1>Transactions</h1>
        <ul className="list-group">
          {this.state.transactions.map(trans => {
            return (
              <li className="list-group-item" key={trans.id}>
                {trans.type} ({trans.ticker}) - {trans.qty} Shares @{' '}
                {trans.price}
              </li>
            );
          })}
          {/* <li className="list-group-item">
            BUY (AAPL) - 6 Shares @ 300.00 - Date?
          </li>
          <li className="list-group-item">
            BUY (AAPL) - 6 Shares @ 300.00 - Date?
          </li>
          <li className="list-group-item">
            BUY (AAPL) - 6 Shares @ 300.00 - Date?
          </li>
          <li className="list-group-item">
            BUY (AAPL) - 6 Shares @ 300.00 - Date?
          </li>
          <li className="list-group-item">
            BUY (AAPL) - 6 Shares @ 300.00 - Date?
          </li> */}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions
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
)(Transactions);
