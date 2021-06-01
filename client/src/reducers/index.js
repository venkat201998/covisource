import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { hospitalReducer } from "./hospitalReducer";

const rootReducer = combineReducers({
  user: userReducer,
  hospital: hospitalReducer
});

export default rootReducer;