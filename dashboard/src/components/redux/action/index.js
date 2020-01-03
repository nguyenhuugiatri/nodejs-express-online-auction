import * as ActionType from "./../constants/ActionType";
import axios from "axios";

export const actOnDelete = id => {
  return {
    type: ActionType.DELETE_USER,
    id
  };
};

export const actOnEdit = user => {
  return {
    type: ActionType.EDIT_USER,
    user
  };
};

export const actSaveUser = user => {
  return {
    type: ActionType.SAVE_USER,
    user
  };
};

export const actFilter = keyword => {
  return {
    type: ActionType.FILTER,
    keyword
  };
};

const actOnListUser = userList => {
  return {
    type: ActionType.ON_LIST_USER,
    userList
  };
};

export const actOnListUserAPI = () => {
  return dispatch => {
    axios({
      method: "GET",
      url:
        "http://localhost:3000/admin/user/list"
    })
      .then(result => {
        console.log(result);
        dispatch(actOnListUser(result.data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};