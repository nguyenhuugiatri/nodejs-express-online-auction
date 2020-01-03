import React, { Component } from "react";
import "./styles.scss";

class Login extends Component {
  render() {
    return (
      <div className="login-container text-center">
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">SIGN IN</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Username
          </label>
          <input
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Username"
            required
            autofocus
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
          />
      
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
