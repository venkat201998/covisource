import React, { useState } from "react";
import { Link } from "react-router-dom";

const PatientCard = ({ patient, type }) => {

  return (
    <div className="col-12 p-lg-4 my-4">
      <form className="container-fluid p-0">
        <div className="card shadow w-100">
          <div className="card-body row">
            <div className="col-lg-5 col-12">              
              <li className="list-group-item border-0 bg-transparent">
                <h5>{patient.firstName } { patient.lastName }</h5>
              </li>
              <li className="list-group-item border-0 bg-transparent">
                {patient.contact}, {patient.email}
              </li>
              <li className="list-group-item border-0 bg-transparent">
                {patient.city}, {patient.state}, {patient.pinCode}
              </li>
            </div>
            <div className="col-lg-5 col-12">
              <ul className="list-group p-0 m-0 flex-lg-column flex-sm-row">
                <li className="list-group-item border-0 bg-transparent">
                    <span className="fw-bold">Admitted Date: </span> {patient.createdDate }
                </li>
                <li className="list-group-item border-0 bg-transparent">
                    <span className="fw-bold">BookedBy: </span> {patient.bookedBy }
                </li>
                <li className="list-group-item border-0 bg-transparent">
                    {type && type!=="ManagePatients" ? (<p><span className="fw-bold"> {patient && patient.status} Date: </span> <span>{patient && patient.updatedDate}</span></p>)  : "" }
                </li>
              </ul>
              
            </div>
            <div className="col-lg-2 col-12">
                <ul className="list-group d-flex flex-row justify-content-center">
                    <li className="list-group-item border-0 bg-transparent">
                        <button className="btn btn-outline-success" type="submit">
                          <Link className="text-dark fw-bold" to={`${patient && type}/${patient._id}`}>View</Link>
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

export default PatientCard;
