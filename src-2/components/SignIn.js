import React, { Component } from 'react';

class SignIn extends Component {
  render() {
    return (
      <div className="card login">
        <form>
          <div className="form-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <div className="btn-group mr-2" role="group">
              <button type="submit" className="btn btn-secondary">
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
