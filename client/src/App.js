import { Switch, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Home from './pages/Home';
import Login from './pages/auth/Login';
import UserRegister from './pages/auth/register/UserRegister';
import HospitalRegister from './pages/auth/register/HospitalRegister'
import Header from './components/nav/header/Header';
import UserRegisterComplete from './pages/auth/register-complete/UserRegisterComplete';
import hospitalRegisterComplete from './pages/auth/register-complete/HospitalRegisterComplete';


const App = () => {

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
        <Route exact path="/hospitalRegisterComplete" component={ hospitalRegisterComplete }></Route>
      </Switch>
    </>
  )
}

export default App;
