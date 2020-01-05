import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../redux/action/index";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.categoryEdit) {
      //Edit
      this.setState({
        id: nextProps.categoryEdit.id,
        name: nextProps.categoryEdit.name
      });
    } else {
      //Add
      this.setState({
        id: "",
        name: ""
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
    const type = this.props.categoryEdit ? "update" : "add";
    event.preventDefault();
    this.props.onSubmit(this.state, type);
  };

  render() {
    return (
      <div
        className="modal fade"
        id="modelIdCategoryRedux"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modelTitleId"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {this.props.categoryEdit ? "EDIT CATEGORY" : "ADD CATEGORY"}
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
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.handleOnChange}
                    value={this.state.name}
                    required
                  />
                </div>
                <button type="submit" className="mt-3 btn btn-success">
                  {this.props.categoryEdit?'Save':'Add'}
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
    categoryEdit: state.categoryReducer.categoryEdit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (category, type) => {
      dispatch(action.actSaveCategory(category, type));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
