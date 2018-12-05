import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUser, fetchPortfolio, getHoldings } from '../store/index';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.props.getUser(this.state);
    await this.props.fetchPortfolio(this.props.user.id);
    await this.props.getHoldings(this.props.portfolio.id);
    this.props.history.push('/home');
  }

  render() {
    return (
      <div className="card login">
        <form onChange={this.handleChange}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
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
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </div>
            <div className="btn-group mr-2" role="group">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={evt => {
                  evt.preventDefault();
                  this.props.history.push('/signup');
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.currentUser,
    portfolio: state.portfolio.portfolio,
    holdings: state.portfolio.holdings
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => dispatch(getUser(user)),
    fetchPortfolio: userId => dispatch(fetchPortfolio(userId)),
    getHoldings: portfolio => dispatch(getHoldings(portfolio))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
