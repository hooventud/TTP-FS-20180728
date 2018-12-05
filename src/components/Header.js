import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../store/index';

class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light" id="navigation">
        <div className="nav-options">
          <Link to="/home">Portfolio</Link>
          <p className="divider">|</p>
          <Link to="/transactions">Transactions</Link>{' '}
          <p className="divider">|</p>
          <Link to="/" onClick={this.props.signOut}>
            Sign Out
          </Link>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
