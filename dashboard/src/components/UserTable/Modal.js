import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../redux/action/index";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      fullname: "",
      password:"",
      email: "",
      phone: "",
      gender: "1",
      permission: "0"
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.userEdit) {
      //Edit
      this.setState({
        username: nextProps.userEdit.username,
        password: nextProps.userEdit.password,
        fullname: nextProps.userEdit.fullname,
        email: nextProps.userEdit.email,
        phone: nextProps.userEdit.phone,
        gender: nextProps.userEdit.gender,
        permission: nextProps.userEdit.permission
      });
    } else {
      //Add
      this.setState({
        username: "",
        fullname: "",
        password:"",
        email: "",
        phone: "",
        gender: "1",
        permission: "0"
      });
    }
  }

  handleOnChange = event => {
    let { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  render() {
    return (
      <div
        className="modal fade"
        id="modelIdUserRedux"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.props.userEdit ? "EDIT USER" : "ADD USER"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={this.handleOnChange}
                    value={this.state.username}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={this.handleOnChange}
                    value={this.state.password}
                  />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="fullname"
                    onChange={this.handleOnChange}
                    value={this.state.fullname}
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-control"
                    name="gender"
                    onChange={this.handleOnChange}
                    value={this.state.gender}
                  >
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={this.handleOnChange}
                    value={this.state.email}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phone"
                    onChange={this.handleOnChange}
                    value={this.state.phone}
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    className="form-control"
                    name="permission"
                    onChange={this.handleOnChange}
                    value={this.state.permission}
                  >
                    <option value="0">Bidder</option>
                    <option value="1">Seller</option>
                  </select>
                </div>
                <button type="submit" className="mt-3 btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userEdit: state.userReducer.userEdit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: user => {
      dispatch(action.actSaveUser(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
