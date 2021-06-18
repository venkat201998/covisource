import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {

  return (
    <div className="col-12 p-lg-4 my-4">
      <form className="container-fluid p-0">
        <div className="card shadow w-100">
          <div className="card-body row">
            <div className="col-lg-5 col-12">
              <li className="list-group-item border-0 bg-transparent">
                <h5>{user.firstName } { user.lastName }</h5>
              </li>
              <li className="list-group-item border-0 bg-transparent">
                {user.contact}, {user.email}
              </li>
              <li className="list-group-item border-0 bg-transparent">
                {user.city}, {user.state}, {user.pinCode}
              </li>
            </div>
            <div className="col-lg-5 col-12">
              <ul className="list-group p-0 m-0 flex-lg-column flex-sm-row">
                <li className="list-group-item border-0 bg-transparent">
                  <span className="fw-bold">Date of Birth:</span> {user.dob }
                </li>
                <li className="list-group-item border-0 bg-transparent">
                  <span className="fw-bold">Gender:</span> {user.gender}
                </li>
                <li className="list-group-item border-0 bg-transparent">
                  <span className="fw-bold">Type:</span> {user.type}
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-12">
                <ul className="list-group d-flex flex-row justify-content-center">
                    <li className="list-group-item border-0 bg-transparent">
                        <button className="btn btn-outline-success" type="submit">
                          <Link className="text-dark fw-bold" to={`ManageUsers/${user._id}`}>View</Link>
                        </button>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserCard;
