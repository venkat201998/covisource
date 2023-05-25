import { combineReducers } from "redux";
import { userReducer } from "./LoggedInUserReducer";
import { hospitalReducer } from "./HospitalReducer";
import { hospitalsReducer } from "./ActiveHospitalsReducer";
import { registeredHospitalReducer } from "./RegisteredHospitalsReducer";
import { usersReducer } from './UsersReducer';

const rootReducer = combineReducers({
  user: userReducer,
  hospital: hospitalReducer,
  registeredHospital: registeredHospitalReducer,
  hospitals: hospitalsReducer,
  users: usersReducer
});

export default rootReducer;