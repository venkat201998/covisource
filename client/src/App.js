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


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        // console.log("user", user);

        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            idToken: user.idTokenResult
          },
        });
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
      </Switch>
    </>
  )
}

export default App;
