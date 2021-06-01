import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { hospitalReducer } from "./HospitalReducer";
import { inActiveHospitalReducer } from "./InActiveHospitalReducer"

const rootReducer = combineReducers({
  user: userReducer,
  hospital: hospitalReducer,
  inActiveHospital: inActiveHospitalReducer,
});

export default rootReducer;