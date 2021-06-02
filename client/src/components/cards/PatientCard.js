import React from "react";
import { Link } from "react-router-dom";

const PatientCard = ({ patient }) => {

    console.log(patient._id)
  return (
    <div key={patient._id} className="col-12 p-4">
      <form>
        <div className="card shadow w-100">
          {/* <img src="" className="card-img-top" alt="..."/> */}
          <div className="card-body row">
            <div className="col-5">
              <h4>{patient.firstName } { patient.lastName }</h4>
              <li className="list-group-item border-0 bg-transparent">
                {patient.contact}, {patient.email}
              </li>
            </div>
            <div className="col-5">
                <li className="list-group-item border-0 bg-transparent">
                    Admitted Date: {patient.createdDate}
                </li>
                <li className="list-group-item border-0 bg-transparent">
                    {patient.city}, {patient.state}, {patient.pinCode}
                </li>
            </div>
            <div className="col-2">
                <ul className="list-group d-flex flex-row justify-content-center">
                    <li className="list-group-item border-0 bg-transparent">
                        <button className="btn btn-success" type="submit"><Link className="text-white fw-bold" to={`ManagePatients/${patient._id}`}>View</Link></button>
                    </li>
                </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PatientCard;
