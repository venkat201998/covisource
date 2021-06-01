import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { hospitalReducer } from "./HospitalReducer";

const rootReducer = combineReducers({
  user: userReducer,
  hospital: hospitalReducer
});

export default rootReducer;