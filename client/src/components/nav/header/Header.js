import React, { useEffect } from "react";
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";
import { useHistory } from 'react-router-dom';

const Header = () => {

  const { user, signInOut } = useSelector((state) => ({...state}));
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    signOut(auth);
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-lg px-md-5">
      <div className="container-fluid mx-md-2">
        <Link to={user ? (user.type!=="Hospital" ? `/` : `/Hospital/Dashboard`) : `/`} className="navbar-brand"><img src="https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg" width="140px;" /></Link>
            
            {!user && <div class="dropstart nav-item my-auto">
              <button class="btn btn-yellow dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-sign-in-alt fs-5"></i>
              </button>
              <ul class="dropdown-menu border-dark" aria-labelledby="dropdownMenuButton1">
                <li><Link className="dropdown-item" to="/login">Login</Link></li>
                <li><Link className="dropdown-item" to="/register">Register</Link></li>
              </ul>
            </div>}

            {user && <div class="dropstart nav-item my-auto">
              <button class="btn btn-yellow dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user fs-5"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                  user && user.type==="Admin" || user.type==="User" ? <li><Link  className="dropdown-item" to="/">Home</Link></li> : null
                }
                <li><Link  className="dropdown-item" to={`/${user.type}/Dashboard`}>{user.type} Dashboard</Link></li>
                {
                  (user && user.type==="Admin") && <li><Link  className="dropdown-item" to={`/User/Dashboard`}>User Dashboard</Link></li>
                }
                <li><Link  className="dropdown-item" to="/" onClick={logout}>Logout</Link></li>
              </ul>
            </div>}
      </div>
    </nav>
  );
};

export default Header;
