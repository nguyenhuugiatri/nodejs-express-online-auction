import React, { Component } from "react";
import { Link } from "@reach/router"
import "./styles.scss";

class Sidebar extends Component {
  render() {
    return (
      <div className="d-flex" id="wrapper">
        <div className="bg-light border-right" id="sidebar-wrapper">
          <div className="sidebar-heading"><Link className="sidebar__heading" to="/">Auction Dashboard</Link></div>
          <div className="list-group list-group-flush">
            <Link
              className="list-group-item list-group-item-action bg-light"
              to="/user-table"
            >
              Users
            </Link>
            <Link
              className="list-group-item list-group-item-action bg-light"
              to="/category-table"
            >
              Categories
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
