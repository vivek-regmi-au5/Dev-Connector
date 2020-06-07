import { combineReducers } from "redux";
import alertReducer from "./../reducers/alert";
import authReducer from "./../reducers/auth";
import profileReducer from "./../reducers/profile";
import postReducer from "./../reducers/post";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
});
export default rootReducer;
