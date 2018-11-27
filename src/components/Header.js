//Sits at the top right of the page
//Link to go to Portfolio
//Link to go to Transactions
//Portfolio | Transactions
import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light" id="navigation">
        <div className="nav-options">
          <a href="/">Portfolio</a>
          <p className="divider">|</p>
          <a href="/">Transactions</a>
        </div>
      </nav>
    );
  }
}

export default Header;
