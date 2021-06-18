import { combineReducers } from "redux";
import { userReducer } from "./UserReducer";
import { hospitalReducer } from "./HospitalReducer";
import { hospitalsReducer } from "./HospitalsReducer";
import { registeredHospitalReducer } from "./RegisteredHospitalsReducer";
import { usersReducer } from './UsersReducer';
import { logoutReducer } from "./Logout";

const rootReducer = combineReducers({
  user: userReducer,
  hospital: hospitalReducer,
  registeredHospital: registeredHospitalReducer,
  hospitals: hospitalsReducer,
  users: usersReducer,
  signOut: logoutReducer
});

export default rootReducer;