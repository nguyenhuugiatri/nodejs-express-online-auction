import * as ActionType from "./../constants/ActionType";
import axios from "axios";
import Swal from "sweetalert2";
import { navigate } from "@reach/router";

export const actOnDelete = id => {
  return dispatch => {
    let token = JSON.parse(sessionStorage.getItem("user")).token;
    axios({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: `http://localhost:3000/admin/user/delete?id=${id}`
    })
      .then(result => {
        dispatch(actOnListUserAPI());
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK"
        });
        console.log(err.message);
      });
  };
};

export const actOnConfirmRequest = id => {
  return dispatch => {
    let token = JSON.parse(sessionStorage.getItem("user")).token;
    axios({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: `http://localhost:3000/admin/user/confirm-request?id=${id}`
    })
      .then(result => {
        dispatch(actOnListUserAPI());
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK"
        });
        console.log(err.message);
      });
  };
};

export const actOnCancelRequest = id => {
  return dispatch => {
    let token = JSON.parse(sessionStorage.getItem("user")).token;
    axios({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: `http://localhost:3000/admin/user/cancel-request?id=${id}`
    })
      .then(result => {
        dispatch(actOnListUserAPI());
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK"
        });
        console.log(err.message);
      });
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

export const actLogout = () => {
  return dispatch => {
    sessionStorage.removeItem("user");
    navigate("/", { replace: true });
    window.location.reload();
  };
};

export const actOnListUserAPI = () => {
  return dispatch => {
    let token = JSON.parse(sessionStorage.getItem("user")).token;
    axios({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "http://localhost:3000/admin/user/list"
    })
      .then(result => {
        dispatch(actOnListUser(result.data));
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
          confirmButtonText: "OK"
        });
        console.log(err.message);
      });
  };
};

export const actLogin = user => {
  return dispatch => {
    axios({
      method: "POST",
      url: "http://localhost:3000/admin/login",
      data: user
    })
      .then(result => {
        if (result.data.user) {
          sessionStorage.setItem("user", JSON.stringify(result.data));
          navigate("/", { replace: true });
          window.location.reload();
        }
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: "Invalid account or password",
          icon: "error",
          confirmButtonText: "OK"
        });
        console.log(err.message);
      });
  };
};
