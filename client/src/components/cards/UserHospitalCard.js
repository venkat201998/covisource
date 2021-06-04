import React from "react";
import { Link } from "react-router-dom";


const UserHospitalCard = ({ hospital }) => {


  return (
      <div key={hospital._id} className="col-12 col-md-6 p-4">
        <form>
          <div className="card shadow">
            {/* <img src="" className="card-img-top" alt="..."/> */}
            <div className="card-body">
                <ul className="list-group p-1">
                    <li className="list-group-item border-0 bg-transparent p-1 fw-bold fs-5">
                        <span><i class="fa fa-hospital fs-3"></i></span> {hospital.hospitalName}
                    </li>
                    <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                        <span><i class="fa fa-phone fs-5"></i></span> {hospital.contact}
                    </li>
                    <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                        <span><i class="fas fa-map-marker-alt fs-5"></i></span> {hospital.city}, {hospital.state}, {hospital.pinCode}
                    </li>
                </ul>
                <ul className="list-group flex-row">
                    <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                        <span className="fw-bold fs-6">General Beds:</span> {hospital.generalBeds}
                    </li>
                    <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                        <span className="fw-bold fs-6">ICU Beds:</span> {hospital.icuBeds}
                    </li>
                </ul>
                <ul className="list-group flex-row">
                    <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                        <span className="fw-bold fs-6">Ventilator Beds:</span> {hospital.ventilatorBeds}
                    </li>
                    <li className="list-group-item border-0 bg-transparent p-1 fs-6">
                        <span className="fw-bold fs-6">Oxygen Beds:</span> {hospital.oxygenBeds}
                    </li>
                </ul>
            </div>
            <div className="card-footer text-center bg-dark">
                <ul className="list-group">
                    <li className="list-group-item border-0 bg-transparent">
                        <button className="btn btn-outline-warning">
                            <Link className="text-white" to={`Dashboard/${hospital._id}`} >Book Slot</Link>
                        </button>
                    </li>
                </ul>
            </div>
          </div>
        </form>
      </div>
  );
};

export default UserHospitalCard;
