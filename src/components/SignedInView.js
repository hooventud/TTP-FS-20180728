import React, { Component } from 'react';
import Header from './Header';
import PortfolioView from './PortfolioView';
import Transactions from './Transactions';

class SignedInView extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="signed-in-view-container">
          <PortfolioView />
        </div>
      </React.Fragment>
    );
  }
}

export default SignedInView;
