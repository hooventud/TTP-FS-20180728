//Header just says Transactions
//Line items for transactions
// ex. BUY (AAPL) - 6 Shares @ 300.00 - Date?
// SELL (AAPL) - 6 Shares @ 300.00 - Date?
import React, { Component } from 'react';

export default class Transactions extends Component {
  render() {
    return (
      <div className="transactions-section">
        <h1>Transactions</h1>
        <ul className="list-group">
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
          </li>
          <li className="list-group-item">
            BUY (AAPL) - 6 Shares @ 300.00 - Date?
          </li>
        </ul>
      </div>
    );
  }
}
