import React, { Component } from "react";
import UserItem from "./UserItem";
import { connect } from "react-redux";
import * as action from "./../redux/action/index";

class Users extends Component {
  componentDidMount() {
    this.props.onListUser();
  }

  renderHTML = () => {
    let { userList, keyword } = this.props;

    userList = userList.filter(item => {
      return item.username.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    });

    return userList.map((item, index) => {
      return <UserItem key={index} user={item} />;
    });
  };

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Fullname</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date Of Birth</th>
              <th>Type</th>
              <th>Active</th>
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
    userList: state.userReducer.userList,
    keyword: state.userReducer.keyword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onListUser: () => {
      dispatch(action.actOnListUserAPI());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
