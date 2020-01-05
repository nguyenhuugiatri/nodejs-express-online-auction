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
      if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
        console.log(err.response);
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
     if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
        console.log(err.response);
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
        if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
        console.log(err.response);
      });
  };
};

export const actOnEdit = user => {
  return {
    type: ActionType.EDIT_USER,
    user
  };
};

export const actFilter = keyword => {
  return {
    type: ActionType.USER_FILTER,
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
        if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
        console.log(err.response);
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
        if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
        console.log(err.response);
      });
  };
};

export const actSaveUser = (user,act) => {
  return dispatch => {
    user.gender = parseInt(user.gender);
    user.permission = parseInt(user.permission);
    if(act==="add")
    delete user.id;
    let token = JSON.parse(sessionStorage.getItem("user")).token;
    axios({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      url: `http://localhost:3000/admin/user/${act}`,
      data: user
    })
      .then(result => {
        dispatch(actOnListUserAPI());
      })
      .catch(err => {
        if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
        console.log(err.response);
      });
  };
};


const actOnListCategory = categoryList => {
  return {
    type: ActionType.ON_LIST_CATEGORY,
    categoryList
  };
};

export const actSaveCategory = category => {
  return dispatch => {
  };
};

export const actOnListCategoryAPI = () => {
  return dispatch => {
    let token = JSON.parse(sessionStorage.getItem("user")).token;
    axios({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "http://localhost:3000/admin/category/list"
    })
      .then(result => {
        dispatch(actOnListCategory(result.data));
      })
      .catch(err => {
        if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
        console.log(err.response);
      });
  };
};

export const actFilterCategory = keyword => {
  return {
    type: ActionType.CATEGORY_FILTER,
    keyword
  };
};

export const actOnDeleteCategory = id => {
  return dispatch => {
    let token = JSON.parse(sessionStorage.getItem("user")).token;
    axios({
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: `http://localhost:3000/admin/category/delete?id=${id}`
    })
      .then(result => {
        dispatch(actOnListCategoryAPI());
      })
      .catch(err => {
      if (err.response) {
          Swal.fire({
            title: "Error",
            text: err.response.data.message,
            icon: "error",
            confirmButtonText: "OK"
          });
        }
        console.log(err.response);
      });
  };
};