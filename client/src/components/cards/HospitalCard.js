import React from "react";
import { Link } from "react-router-dom";

const HospitalCard = ({ hospital }) => {

  return (
    <div className="col-12 p-lg-4 my-4">
      <form className="container-fluid p-0">
        <div className="card shadow w-100">
          <div className="card-body row">
            <div className="col-lg-5 col-12">
              <li className="list-group-item border-0 bg-transparent">
                <h5>{hospital.hospitalName}</h5>
              </li>
              <li className="list-group-item border-0 bg-transparent">
                {hospital.contact}, {hospital.email}
              </li>
            </div>
            <div className="col-lg-5 col-12">
                <li className="list-group-item border-0 bg-transparent">
                    {hospital.streetAddress}, {hospital.city}, {hospital.state}, {hospital.pinCode}
                </li>
            </div>
            <div className="col-lg-2 col-12">
                <ul className="list-group d-flex flex-row justify-content-center">
                    <li className="list-group-item border-0 bg-transparent">
                        <button className="btn btn-outline-success" type="submit"><Link className="text-dark fw-bold" to={`ManageHospitals/${hospital._id}`}>View</Link></button>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HospitalCard;
