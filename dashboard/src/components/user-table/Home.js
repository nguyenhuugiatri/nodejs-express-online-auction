import React, { Component } from "react";
import Search from "./Search";
import Users from "./Users";
import Modal from "./Modal";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="display-4 text-center my-3">User Management</h1>
        <div className="row align-items-center mb-3 mx-5">
          <div className="col-10">
            <Search />
          </div>
          <div className="col-2">
            <button
              className="btn btn-success"
              data-toggle="modal"
              data-target="#modelIdUserRedux"
              onClick={() => {
                this.props.onEdit();
              }}
            >
              Add User
            </button>
          </div>
        </div>
        <Users />
        <Modal />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEdit: () => {
      let action = {
        type: "EDIT_USER",
        user: null
      };
      dispatch(action);
    }
  };
};

export default connect(null, mapDispatchToProps)(Home);
