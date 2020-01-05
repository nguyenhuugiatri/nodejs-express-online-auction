import React, { Component } from "react";
import Search from "./Search";
import Categories from "./Categories";
import Modal from "./Modal";
import { connect } from "react-redux";

class CategoryTable extends Component {
  render() {
    return (
      <div>
        <div className="row align-items-center mb-3 mx-5">
          <div className="col-10">
            <Search />
          </div>
          <div className="col-2">
            <button
              className="btn btn-success"
              data-toggle="modal"
              data-target="#modelIdCategoryRedux"
              onClick={() => {
                this.props.onEdit();
              }}
            >
              Add Category
            </button>
          </div>
        </div>
        <Categories />
        <Modal />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEdit: () => {
      let action = {
        type: "EDIT_CATEGORY",
        category: null
      };
      dispatch(action);
    }
  };
};

export default connect(null, mapDispatchToProps)(CategoryTable);
