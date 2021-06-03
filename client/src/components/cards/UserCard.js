import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {


  return (
    <div key={user._id} className="col-12 p-4">
      <form>
        <div className="card shadow w-100">
          {/* <img src="" className="card-img-top" alt="..."/> */}
          <div className="card-body row">
            <div className="col-5">
              <h4>{user.firstName } { user.lastName }</h4>
              <li className="list-group-item border-0 bg-transparent">
                {user.contact}, {user.email}
              </li>
              <li className="list-group-item border-0 bg-transparent">
                {user.city}, {user.state}, {user.pinCode}
              </li>
            </div>
            <div className="col-5">
              <li className="list-group-item border-0 bg-transparent">
                <span className="fw-bold">Date of Birth:</span> {user.dob }
              </li>
              <li className="list-group-item border-0 bg-transparent">
                <span className="fw-bold">Gender:</span> {user.gender}
              </li>
              <li className="list-group-item border-0 bg-transparent">
                <span className="fw-bold">Type:</span> {user.type}
              </li>
            </div>
            <div className="col-2">
                <ul className="list-group d-flex flex-row justify-content-center">
                    <li className="list-group-item border-0 bg-transparent">
                        <button className="btn btn-success" type="submit">
                          <Link className="text-white fw-bold" to={`ManageUsers/${user._id}`}>View</Link>
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
