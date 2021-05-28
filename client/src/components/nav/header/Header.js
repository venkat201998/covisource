import React from "react";
import firebase from 'firebase';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

  const { user } = useSelector((state) => ({...state}));
  const dispatch = useDispatch();

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGOUT',
      payload: null
    })
  }

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-lg px-md-5">
      <div className="container-fluid mx-md-2">
        <Link to="/" className="navbar-brand"><img src="https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg" width="140px;" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {!user && <li className="nav-item p-1">
              <Link className="nav-link" to="/login">
                <button className="btn btn-raised">Login</button>
              </Link>
            </li>}

            {!user && <div class="dropdown nav-item m-auto">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Register
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link  className="dropdown-item" to="/userRegister">User</Link></li>
                <li><Link  className="dropdown-item" to="/hospitalRegister">Hospital</Link></li>
              </ul>
            </div>}

            {user && <div class="dropdown nav-item my-auto mx-5">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link  className="dropdown-item" to={`/${user.type}/Dashboard`}>{user.type} Dashboard</Link></li>
                {
                  (user && user.type==="Admin") && <li><Link  className="dropdown-item" to={`/User/Dashboard`}>User Dashboard</Link></li>
                }
                <li><Link  className="dropdown-item" to="/login" onClick={logout}>Logout</Link></li>
              </ul>
            </div>}

            {/* {user && <li className="nav-item p-1">
              <Link className="nav-link" to="/login">
                <button className="btn btn-raised" onClick={logout}>Logout</button>
              </Link>
            </li>} */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
