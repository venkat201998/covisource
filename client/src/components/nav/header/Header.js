import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light shadow-lg px-md-5">
      <div className="container-fluid mx-md-2">
        <Link to="/" className="navbar-brand"><img src="https://prod-cdn.preprod.co-vin.in/assets/images/covid19logo.jpg" width="140px;" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item p-1">
              <Link className="nav-link" to="/login">
                <button className="btn btn-raised">Login</button>
              </Link>
            </li>
            <div class="dropdown nav-item m-auto">
              <button class="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Register
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link  className="dropdown-item" to="/userRegister">User</Link></li>
                <li><Link  className="dropdown-item" to="/hospitalRegister">Hospital</Link></li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
