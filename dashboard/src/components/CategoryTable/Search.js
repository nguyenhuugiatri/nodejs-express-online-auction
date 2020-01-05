import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "./../redux/action/index";

class Search extends Component {
  render() {
    return (
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          onChange={event => {
            this.props.onFilter(event.target.value);
          }}
        />
        <div className="input-group-append">
          <span className="input-group-text">
            Search
          </span>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilter: keyword => {
      dispatch(action.actFilterCategory(keyword));
    }
  };
};

export default connect(null, mapDispatchToProps)(Search);
