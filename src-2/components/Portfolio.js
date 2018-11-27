//portfolio and value as header
//Portfolio ($5943.34)
//line items for ticker - # shares  $value

import React, { Component } from 'react';

export default class Portfolio extends Component {
  render() {
    return (
      <div className="portfolio-section">
        <h1>Portfolio ($5943.34)</h1>
        <ul className="list-group">
          <li className="list-group-item">ticker - # shares $value</li>
          <li className="list-group-item">ticker - # shares $value</li>
          <li className="list-group-item">ticker - # shares $value</li>
          <li className="list-group-item">ticker - # shares $value</li>
          <li className="list-group-item">ticker - # shares $value</li>
        </ul>
      </div>
    );
  }
}
