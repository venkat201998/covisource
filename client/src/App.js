import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import "react-toastify/dist/ReactToastify.css";
import './App.css';

import Home from './pages/Home';
import Login from './pages/auth/Login';
import UserRegister from './pages/auth/register/UserRegister';
import HospitalRegister from './pages/auth/register/HospitalRegister'
import Header from './components/nav/header/Header';
import UserRegisterComplete from './pages/auth/register-complete/UserRegisterComplete';
import HospitalRegisterComplete from './pages/auth/register-complete/HospitalRegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminHome from './pages/admin/AdminHome';
import HospitalHome from './pages/hospital/HospitalHome';
import UserHome from './pages/user/UserHome';
import AdminRoute from './components/routes/AdminRoute';
import UserRoute from './components/routes/UserRoute';
import HospitalRoute from './components/routes/HospitalRoute';
import { currentUser, checkHospital } from './functions/auth';
import UpdateHospital from './pages/admin/UpdateHospital';
import UpdatePatient from './pages/hospital/UpdatePatient';
import UpdateHospitalStatus from './pages/admin/UpdateHospitalStatus';
import UpdateUser from './pages/admin/UpdateUser';



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);
        let options=[];
        let uaoptions=[];

        currentUser(idTokenResult.token)
        .then((res)=>{
            switch(res.data.type){
                case 'Admin': options.push('Dashboard', 'RegisterHospital', 'ManageHospitals', 'ManageUsers', 'UpdatePassword');
                              //uaoptions.push('Dashboard', 'Slot', 'SlotsHistory', 'UpdatePassword');
                break;
                case 'Hospital': options=['Dashboard', 'ManageHospital', 'RegisterPatient', 'ManagePatients', 'PatientsHistory', 'UpdatePassword'];
                break;
                case 'User': options=['Dashboard', 'Slot', 'SlotsHistory', 'UpdatePassword'];
                break;
                
            }
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: res.data.email,
              firstName: res.data.firstName,
              type: res.data.type,
              _id: res.data._id,
              options: options,
              uaoptions: uaoptions,
              token: res.config.headers.idToken
            },
          });
        })

        checkHospital(user.email)
        .then((res)=>{
            if(res.data!=="Hospital not registered"){
                dispatch({
                    type:'LOGIN',
                    payload: res.data
                })
            }
        })
        .catch((e) => console.log(e));        
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
        <Route exact path="/userRegister" component={ UserRegister }></Route>
        <Route exact path="/hospitalRegister" component={ HospitalRegister }></Route>
        <Route exact path="/userRegisterComplete" component={ UserRegisterComplete }></Route>
        <Route exact path="/hospitalRegisterComplete" component={ HospitalRegisterComplete }></Route>
        <Route exact path="/forgot/password" component={ForgotPassword} />
        {/* <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />  */}
        {/* <HospitalRoute exact path="/hospital/dashboard" component={HospitalDashboard} /> */}
        <AdminRoute exact path="/Admin/:slug" component={ AdminHome } />
        <AdminRoute exact path="/Admin/ManageHospitals/:slug" component={ UpdateHospital } />
        <AdminRoute exact path="/Admin/ManageUsers/:slug" component={ UpdateUser } />
        <AdminRoute exact path="/Admin/Dashboard/:slug" component={ UpdateHospitalStatus } />
        <HospitalRoute exact path="/Hospital/:slug" component={ HospitalHome } />
        <HospitalRoute exact path="/Hospital/ManagePatients/:slug" component={ UpdatePatient } />
        <HospitalRoute exact path="/Hospital/PatientsHistory/:slug" component={ UpdatePatient } />
        <UserRoute exact path="/User/:slug" component={ UserHome}/>
      </Switch>
    </>
  )
}

export default App;
