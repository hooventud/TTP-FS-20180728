import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, fetchPortfolio, getHoldings } from '../store/index';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    await this.props.createUser(this.state);
    await this.props.fetchPortfolio(this.props.user.id);
    await this.props.getHoldings(this.props.portfolio.id);
    this.props.history.push('/home');
  }

  render() {
    return (
      <div className="card login">
        <form onChange={this.handleChange}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
              placeholder="Enter name"
            />
          </div>
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
              placeholder="Enter password"
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
                onClick={this.handleSubmit}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
            <div className="btn-group mr-2" role="group">
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={evt => {
                  evt.preventDefault();
                  this.props.history.push('/');
                }}
              >
                Sign In
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
    createUser: user => dispatch(createUser(user)),
    fetchPortfolio: userId => dispatch(fetchPortfolio(userId)),
    getHoldings: holdings => dispatch(getHoldings(holdings))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
