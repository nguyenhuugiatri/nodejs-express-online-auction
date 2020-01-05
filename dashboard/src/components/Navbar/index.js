import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../redux/action/index";

class Navbar extends Component {
  render() {
    const user = JSON.parse(sessionStorage.getItem("user")).user;
    const { logout } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                {user.name} <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <button type="button" class="nav-link btn btn-light btn-sm" onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(action.actLogout());
    }
  };
};

export default connect(null,mapDispatchToProps)(Navbar);
