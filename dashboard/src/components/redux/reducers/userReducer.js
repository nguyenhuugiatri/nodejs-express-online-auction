import * as ActionType from "./../constants/ActionType";

let initState = {
  userList: [],
  userEdit: null,
  keyword: "",
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.ON_LIST_USER:
      state.userList=action.userList;
      return { ...state };
    case ActionType.SAVE_USER:
      if (action.user.id) {
        //UPDATE
        let userList = [...state.userList];
        let index = userList.findIndex(item => {
          return item.id === action.user.id;
        });

        if (index !== -1) {
          userList[index] = action.user;
          state.userList = userList;
        }
      } else {
        //ADD
        let user = { ...action.user };
        user.id = Math.random();
        state.userList = [...state.userList, user];
      }
      return { ...state };

    case ActionType.EDIT_USER:
      state.userEdit = action.user;
      return { ...state };

    case ActionType.FILTER:
      state.keyword = action.keyword;

      return { ...state };

    default:
      return { ...state };
  }
};

export default userReducer;
