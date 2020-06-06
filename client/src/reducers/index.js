import { combineReducers } from "redux";
import alertReducer from "./../reducers/alert";
import authReducer from "./../reducers/auth";
import profileReducer from "./../reducers/profile";

const rootReducer = combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
});
export default rootReducer;
