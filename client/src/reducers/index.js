import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { hospitalReducer } from "./HospitalReducer";
import { hospitalsReducer } from "./HospitalsReducer";
import { registeredHospitalReducer } from "./RegisteredHospitalsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  hospital: hospitalReducer,
  registeredHospital: registeredHospitalReducer,
  hospitals: hospitalsReducer
});

export default rootReducer;