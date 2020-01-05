import { combineReducers } from "redux";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  userReducer,
  categoryReducer
});

export default rootReducer;
