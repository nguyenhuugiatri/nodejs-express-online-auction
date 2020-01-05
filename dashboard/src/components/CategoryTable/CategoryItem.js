import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../redux/action/index";
import "./styles.scss";

class CategoryItem extends Component {
  render() {
    let { category } = this.props;
    return (
      <tr>
        <td className="column-password overflow-auto">{category.id}</td>
        <td className="column-password overflow-auto">{category.name}</td>
        <td className="column-password overflow-auto">{category.quantity}</td>
        <td>
          <button
            className="btn btn-info mr-2"
            data-toggle="modal"
            data-target="#modelIdCategoryRedux"
            onClick={() => {
              this.props.onEdit(category);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.onDelete(category.id);
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
    onEdit: category => {
      dispatch(action.actOnEdit(category));
    },
    onConfirmRequest: id => {
      dispatch(action.actOnConfirmRequest(id));
    },
    onCancelRequest: id => {
      dispatch(action.actOnCancelRequest(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(CategoryItem);
