import React from "react";
import { Link } from "react-router-dom";

const DisplayCard = ({ hospital }) => {

  return (
    <div key={hospital._id} className="col-12 p-4">
      <form>
        <div className="card shadow w-100">
          {/* <img src="" className="card-img-top" alt="..."/> */}
          <div className="card-body row">
            <div className="col-5">
              <h4>{hospital.hospitalName}</h4>
              <li className="list-group-item border-0 bg-transparent">
                {hospital.contact}, {hospital.email}
              </li>
            </div>
            <div className="col-5">
                <li className="list-group-item border-0 bg-transparent">
                    {hospital.streetAddress}
                </li>
                <li className="list-group-item border-0 bg-transparent">
                    {hospital.city}, {hospital.state}, {hospital.pinCode}
                </li>
            </div>
            <div className="col-2">
                <ul className="list-group d-flex flex-row justify-content-center">
                    <li className="list-group-item border-0 bg-transparent">
                        <button className="btn btn-success" type="submit"><Link className="text-white fw-bold" to={`ManageHospitals/${hospital._id}`}>View</Link></button>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DisplayCard;
