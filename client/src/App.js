import { Switch, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "react-toastify/dist/ReactToastify.css";

import Home from './pages/Home';
import Login from './pages/auth/Login';
import UserRegister from './pages/auth/register/UserRegister';
import HospitalRegister from './pages/auth/register/HospitalRegister'
import Header from './components/nav/header/Header';
import UserRegisterComplete from './pages/auth/register-complete/UserRegisterComplete';
import HospitalRegisterComplete from './pages/auth/register-complete/HospitalRegisterComplete';
import ForgotPassword from './pages/auth/ForgotPassword';
import { auth } from './firebase';
import AdminDashboard from './pages/admin/AdminDashboard';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import AdminRoute from './components/routes/AdminRoute';
import UserRoute from './components/routes/UserRoute';
import HospitalRoute from './components/routes/HospitalRoute';
import { currentUser } from './functions/auth';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        currentUser(idTokenResult.token)
        .then((res)=>{
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              email: res.data.email,
              firstName: res.data.firstName,
              type: res.data.type,
              _id: res.data._id,
              token: res.config.headers.idToken
            },
          });
        })
        
      }
    })
  }, [])

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
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} /> 
        <HospitalRoute exact path="/hospital/dashboard" component={HospitalDashboard} />
      </Switch>
    </>
  )
}

export default App;
