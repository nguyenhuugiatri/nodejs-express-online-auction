import React, { Component } from "react";
import * as action from "./../redux/action/index";
import { connect } from "react-redux";
import "./styles.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  handleOnChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.login(this.state);
  };

  render() {
    return (
      <div className="login-container text-center">
        <form className="form-signin" onSubmit={this.handleOnSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">SIGN IN</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Username
          </label>
          <input
            name="username"
            onChange={this.handleOnChange}
            type="text"
            id="inputEmail"
            className="form-control"
            placeholder="Username"
            required
          />
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            name="password"
            onChange={this.handleOnChange}
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

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => {
      dispatch(action.actLogin(user));
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
