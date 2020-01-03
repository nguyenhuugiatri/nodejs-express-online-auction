import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../redux/action/index";
import './styles.scss'
import moment from 'moment'

class UserItem extends Component {
  render() {
    let { user } = this.props;
    return (
      <tr>
        <td className="column-password overflow-auto">{user.id}</td>
        <td className="column-password overflow-auto">{user.username}</td>
        <td className="column-password overflow-auto">{user.password}</td>
        <td className="column-password overflow-auto">{user.fullname}</td>
        <td className="column-password overflow-auto">{user.gender == 1 ? "Male" : "Female"}</td>
        <td className="column-password overflow-auto">{user.email}</td>
        <td className="column-password overflow-auto">{user.phone}</td>
        <td className="column-password overflow-auto">{moment(user.dob).format("YYYY-MM-DD")}</td>
        <td className="column-password overflow-auto">{user.permission == 0 ? "Bidder" : "Seller"}</td>
        <td>
          {(user.active == 0) && (
            <select className="custom-select">
                <option value="0" defaultValue>Inactive</option>
                <option value="1">Active</option>
            </select>
          )}
          {(user.active == 1) && (
            <select className="custom-select">
                <option value="1" defaultValue>Active</option>
                <option value="0">Inactive</option>
            </select>
          )}
        </td>
        <td>
          <button
            className="btn btn-info mr-2"
            data-toggle="modal"
            data-target="#modelIdUserRedux"
            onClick={() => {
              this.props.onEdit(user);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.onDelete(user.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onDelete: id => {
      dispatch(action.actOnDelete(id));
    },

    onEdit: user => {
      dispatch(action.actOnEdit(user));
    }
  };
};

export default connect(null, mapDispatchToProps)(UserItem);
