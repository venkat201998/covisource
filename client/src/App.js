import { Switch, Route } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Header from './components/nav/header/Header';
import RegisterComplete from './pages/auth/RegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminHome from './pages/admin/AdminHome';
import HospitalHome from './pages/hospital/HospitalHome';
import UserHome from './pages/user/UserHome';
import AdminRoute from './components/routes/AdminRoute';
import UserRoute from './components/routes/UserRoute';
import HospitalRoute from './components/routes/HospitalRoute';
import { currentUser, checkHospital, getHospitals, getInactiveHospitals, getUsers } from './functions/auth';
import UpdateHospital from './pages/admin/UpdateHospital';
import UpdatePatient from './pages/hospital/UpdatePatient';
import UpdateHospitalStatus from './pages/admin/UpdateHospitalStatus';
import UpdateUser from './pages/admin/UpdateUser';


const App = () => {

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        let options=[];
        let uaoptions=[];

        currentUser(idTokenResult.token)
        .then((res)=>{
            switch(res.data.type){
                case 'Admin': options= ['Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword'];
                break;
                case 'Hospital': options=['Dashboard', 'ManageHospital', 'RegisterPatient', 'ManagePatients', 'PatientsHistory', 'UpdatePassword'];
                break;
                case 'User': options=['Dashboard','SlotRegistration', 'Slot', 'SlotsHistory', 'UpdatePassword'];
                break;
                
            };
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                  firstName: res.data.firstName,
                  lastName: res.data.lastName,
                  dob: res.data.dob,
                  gender:res.data.gender,
                  email:res.data.email,
                  contact: res.data.contact,
                  address: res.data.address,
                  state: res.data.state,
                  city:res.data.city,
                  pinCode: res.data.pinCode,      
                  type: res.data.type,
                  _id: res.data._id,
                  options: options,
                  uaoptions: uaoptions,
                  slots: res.data.slots,
                  token: res.config.headers.idToken
              },
            });
            if(res.data.type === 'Hospital'){
              checkHospital(user.email)
              .then((res)=>{
                  if(res.data!=="Hospital not registered"){
                      dispatch({
                          type:'HOSPITAL',
                          payload: res.data
                      })
                  }
              })
              .catch((e) => toast.error(e));
              history.push('/Hospital/Dashboard');
            }
            else if(res.data.type === 'Admin'){
              getInactiveHospitals(idTokenResult.token)
              .then((res) => {
                  dispatch({
                      type: "INACTIVE_HOSPITALS",
                      payload: res.data
                  })
              })
              .catch((err) => toast.error(err));

              getHospitals()
              .then((res) => {
                  dispatch({
                      type: "ACTIVE_HOSPITALS",
                      payload: res.data
                  })
              })
              .catch((err) => toast.error(err));

              getUsers(idTokenResult.token)
              .then((res) => {
                  if(res.data !== "No User Found"){
                      dispatch({
                          type: "REGISTERED_USERS",
                          payload: res.data
                      })
                  }
              })
              .catch((err) => toast.error(err))
            }
            else if(res.data.type === 'User'){
              getHospitals()
              .then((res) => {
                  dispatch({
                      type: "ACTIVE_HOSPITALS",
                      payload: res.data
                  })
              })
              .catch((err) => toast.error(err));
            }
        })
              
      }
      else{
        dispatch({
          type: 'LOGOUT',
          payload: null
        })
      }
    })
    return () => unsubscribe();
  }, [dispatch]);

  return(
    <>
      <Header/>
      <ToastContainer/>
      <Switch>
        <Route exact path="/" component={ Home }></Route>
        <Route exact path="/login" component={ Login }></Route>
        <Route exact path="/register" component={ Register }></Route>
        <Route exact path="/register/complete" component={ RegisterComplete }></Route>
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <AdminRoute exact path="/Admin/:slug" component={ AdminHome } />
        <AdminRoute exact path="/Admin/ManageHospitals/:slug" component={ UpdateHospital } />
        <AdminRoute exact path="/Admin/ManageUsers/:slug" component={ UpdateUser } />
        <AdminRoute exact path="/Admin/Dashboard/:slug" component={ UpdateHospitalStatus } />
        <HospitalRoute exact path="/Hospital/:slug" component={ HospitalHome } />
        <HospitalRoute exact path="/Hospital/ManagePatients/:slug" component={ UpdatePatient } />
        <HospitalRoute exact path="/Hospital/PatientsHistory/:slug" component={ UpdatePatient } />
        <UserRoute exact path="/User/:slug" component={ UserHome}/>
        <UserRoute exact path="/User/SlotRegistration/:slug" component={ UserHome}/>
      </Switch>
    </>
  )
}

export default App;
