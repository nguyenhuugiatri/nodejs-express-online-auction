import * as ActionType from "./../constants/ActionType";

let initState = {
  categoryList: [],
  categoryEdit: null,
  keyword: ""
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionType.ON_LIST_CATEGORY:
      state.categoryList = action.categoryList;
      return { ...state };

    case ActionType.EDIT_CATEGORY:
      state.categoryEdit = action.category;
      return { ...state };

    case ActionType.CATEGORY_FILTER:
      state.keyword = action.keyword;
      return { ...state };

    default:
      return { ...state };
  }
};

export default categoryReducer;
