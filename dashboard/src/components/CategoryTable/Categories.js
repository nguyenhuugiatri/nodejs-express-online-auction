import React, { Component } from "react";
import CategoryItem from "./CategoryItem";
import { connect } from "react-redux";
import * as action from "./../redux/action/index";

class Categories extends Component {
  componentDidMount() {
    this.props.onListCategory();
  }

  renderHTML = () => {
    let { categoryList, keyword } = this.props;

    categoryList = categoryList.filter(item => {
      return item.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    return categoryList.map((item, index) => {
      return <CategoryItem key={index} category={item} />;
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Number Of Products</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>{this.renderHTML()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categoryList: state.categoryReducer.categoryList,
    keyword: state.categoryReducer.keyword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onListCategory: () => {
      dispatch(action.actOnListCategoryAPI());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
