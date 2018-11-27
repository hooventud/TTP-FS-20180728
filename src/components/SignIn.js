import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await axios.post('/auth/login', this.state);
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
              <button className="btn btn-primary" onClick={this.handleSubmit}>
                Submit
              </button>
            </div>
            <div className="btn-group mr-2" role="group">
              <button
                className="btn btn-secondary"
                onClick={() => {
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

export default SignIn;
